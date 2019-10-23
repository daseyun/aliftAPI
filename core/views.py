from django.contrib.auth.models import User
from .models import MuscleGroup, Profile
from rest_framework import viewsets
from core.serializers import ProfileSerializer, MuscleGroupSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    # permission_classes = [
    #     permissions.AllowAny
    # ]
    serializer_class = ProfileSerializer

class MuscleGroupViewSet(viewsets.ModelViewSet):
    queryset = MuscleGroup.objects.all()
    # permission_classes = [ 
    #     permissions.AllowAny
    # ]
    serializer_class = MuscleGroupSerializer