from rest_framework import serializers
from .models import User, Sweet

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'role', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class SweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sweet
        fields = ['id','name','category','price','quantity','description','image_url','created_at','updated_at']