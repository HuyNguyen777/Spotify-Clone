from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
