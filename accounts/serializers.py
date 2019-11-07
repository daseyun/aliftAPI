from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from core.models import Profile

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    # programs = ProgramSerializer()
    class Meta:
        model = User
        fields = ('id', 'username', 'email', )


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        # profile_data = validated_data.pop('profile')
        # create profile
        Profile.objects.create(
            user=user
            # first_name = profile_data['first_name'],
            # last_name = profile_data['last_name'],
            # etc...
        )
        return user

# Login Serializer


# not ModelSerializer since not creating a model. only validating user authentication
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
