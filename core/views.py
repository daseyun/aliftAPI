from django.contrib.auth.models import User
from .models import Program, Exercise, MuscleGroup, ExerciseSetDetail, ExerciseWeight, Profile
from rest_framework import viewsets, permissions
from core.serializers import ProgramSerializer, ExerciseSerializer, MuscleGroupSerializer, ExerciseRepsSerializer, ExerciseWeightSerializer, ProfileSerializer

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



class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    permission_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = ProgramSerializer

    # def get_queryset(self):
    #     return self.request.user.programs.all()

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)


class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    permission_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = ExerciseSerializer

class ExerciseRepsViewSet(viewsets.ModelViewSet):
    queryset = ExerciseSetDetail.objects.all()
    permission_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = ExerciseRepsSerializer

class ExerciseWeightViewSet(viewsets.ModelViewSet):
    queryset = ExerciseWeight.objects.all()
    permission_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = ExerciseWeightSerializer

