from django.shortcuts import render
from .serializers import UserSerializer , SweetSerializer
from .models import User, Sweet

from rest_framework.generics import ListAPIView

# Create your views here.
class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer