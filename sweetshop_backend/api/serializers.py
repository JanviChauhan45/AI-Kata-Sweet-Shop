from rest_framework import serializers
from .models import User,Sweet

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','email','password_hash','role','created_at']


class SweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sweet
        fields = ['id','name','category','price','quantity','description','image_url','created_at','updated_at']