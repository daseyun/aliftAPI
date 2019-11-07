from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# Profile of user.


class Profile(models.Model):
    user = models.OneToOneField(
        User, related_name='profile', on_delete=models.CASCADE)

# Muscle groups (Unrelated)


class MuscleGroup(models.Model):
    muscle_group_name = models.CharField(max_length=100)


# Exercise (Unrelated)
class Exercise(models.Model):
    exercise_name = models.CharField(max_length=100)
    exercise_description = models.CharField(max_length=1000, null=True)
    muscle_group = models.ManyToManyField(
        MuscleGroup, related_name='muscleGroups', blank=True)

# User's Program (Private to user)


class Program(models.Model):
    program_name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        User, related_name='programs', on_delete=models.SET_NULL, null=True)

# Stores information of a set for an exercise. To be used with Program.


class ExerciseSetDetail(models.Model):
    program = models.ForeignKey(
        Program, related_name='exerciseSetDetail', on_delete=models.SET_NULL, null=True)
    exercise = models.ForeignKey(
        Exercise, related_name='exerciseSetDetail', on_delete=models.SET_NULL, null=True)
    sets = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(1000)], null=True)
    reps = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(1000)], null=True)

# Stores information about user's set performance. (ExerciseReps must exist before ExerciseWeight)


class ExerciseWeight(models.Model):
    exercise = models.ForeignKey(
        Exercise, related_name='exerciseWeights', on_delete=models.SET_NULL, null=True)
    set_number = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(1000)], null=True)
    rep_number = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(1000)], null=True)
    weight = models.FloatField(
        validators=[MinValueValidator(1), MaxValueValidator(1000)], null=True)
    exerciseSetDetails = models.ForeignKey(
        ExerciseSetDetail, related_name='exerciseWeights', on_delete=models.SET_NULL, null=True)


# L
