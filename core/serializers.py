from rest_framework import serializers
from .models import Program, Exercise, MuscleGroup, ExerciseSetDetail, ExerciseWeight, Profile
from django.contrib.auth.models import User


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField

    class Meta:
        model = Profile
        fields = ['id', 'user', ]
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
        fields = ['id', 'program_name', 'owner',
                  'exerciseSetDetail', 'isActive']


class ExerciseSetDetailSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    # exerciseWeights = serializers.ReadOnlyField()

    class Meta:
        model = ExerciseSetDetail
        fields = ['url', 'id', 'sets', 'reps',
                  'program', 'exercise', 'exerciseWeights', 'exercise_order']
        read_only_fields = ['exerciseWeights']


class ExerciseWeightSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = ExerciseWeight
        fields = '__all__'
        # fields = ['url', 'id', 'set_number', 'rep_number', 'weight', 'exercise', 'exerciseReps']
