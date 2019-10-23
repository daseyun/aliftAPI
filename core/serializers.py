from rest_framework import serializers
from .models import MuscleGroup, Profile
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField

    class Meta:
        model = Profile
        # fields = ['id','user','programs']
        fields = ['id','user']
class MuscleGroupSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField

    class Meta:
        model = MuscleGroup
        fields = '__all__'