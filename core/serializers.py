from rest_framework import serializers
from .models import Program, Exercise, MuscleGroup, ExerciseReps, ExerciseWeight, Profile
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField

    class Meta:
        model = Profile
        fields = ['id','user','programs']
        # fields = ['id','user']
class MuscleGroupSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField

    class Meta:
        model = MuscleGroup
        fields = '__all__'

class ExerciseSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField

    class Meta:
        model = Exercise
        fields = '__all__'


class ProgramSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Program
        # fields = ['url', 'id', 'program_name', 'owner', 'exerciseReps']
        # fields = ['id','program_name','owner','exerciseReps']
        fields = ['id','program_name','owner', 'exerciseReps']



class ExerciseRepsSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    # exerciseWeights = serializers.ReadOnlyField()
    class Meta:
        model = ExerciseReps
        fields= ['url','id','sets','reps','program','exercise', 'exerciseWeights']
        read_only_fields = ['exerciseWeights']

class ExerciseWeightSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = ExerciseWeight
        fields='__all__'
        # fields = ['url', 'id', 'set_number', 'rep_number', 'weight', 'exercise', 'exerciseReps']