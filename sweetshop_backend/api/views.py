from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password, check_password
from .models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        data = request.data
        user = User.objects.create(
            name=data['name'],
            email=data['email'],
            password_hash=make_password(data['password']),
            role='customer'
        )
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {'id': user.id, 'name': user.name, 'email': user.email, 'role': user.role}
        })
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    try:
        data = request.data
        user = User.objects.get(email=data['email'])
        if check_password(data['password'], user.password_hash):
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {'id': user.id, 'name': user.name, 'email': user.email, 'role': user.role}
            })
        else:
            return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return Response({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role
    })

