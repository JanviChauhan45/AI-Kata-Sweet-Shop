from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password, check_password
from .models import User, Sweet
from .serializers import SweetSerializer

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

# Sweet Management Views
@api_view(['GET'])
@permission_classes([AllowAny])
def sweets_list(request):
    """Get all sweets"""
    try:
        sweets = Sweet.objects.all()
        serializer = SweetSerializer(sweets, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def sweet_detail(request, sweet_id):
    """Get a specific sweet"""
    try:
        sweet = Sweet.objects.get(id=sweet_id)
        serializer = SweetSerializer(sweet)
        return Response(serializer.data)
    except Sweet.DoesNotExist:
        return Response({'error': 'Sweet not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_sweet(request):
    """Create a new sweet (Admin only)"""
    try:
        if request.user.role != 'admin':
            return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = SweetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_sweet(request, sweet_id):
    """Update a sweet (Admin only)"""
    try:
        if request.user.role != 'admin':
            return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
        
        sweet = Sweet.objects.get(id=sweet_id)
        serializer = SweetSerializer(sweet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Sweet.DoesNotExist:
        return Response({'error': 'Sweet not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_sweet(request, sweet_id):
    """Delete a sweet (Admin only)"""
    try:
        if request.user.role != 'admin':
            return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
        
        sweet = Sweet.objects.get(id=sweet_id)
        sweet.delete()
        return Response({'message': 'Sweet deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Sweet.DoesNotExist:
        return Response({'error': 'Sweet not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def categories_list(request):
    """Get all unique categories"""
    try:
        categories = Sweet.objects.values_list('category', flat=True).distinct()
        category_list = [{'id': cat, 'name': cat.title()} for cat in categories]
        # Add "All Sweets" option
        category_list.insert(0, {'id': 'all', 'name': 'All Sweets'})
        return Response(category_list)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

