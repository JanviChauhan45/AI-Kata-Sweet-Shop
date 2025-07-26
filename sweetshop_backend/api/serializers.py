from rest_framework import serializers
from .models import User , Sweet

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = ['id','name','email','password_hash','role','created_at']


class SweetSerializer(serializers.ModelSerializer)
    class Meta:
        model = Sweet
        field = ['id','name','category','price','quantity','description','image_url','created_at','updated_at']