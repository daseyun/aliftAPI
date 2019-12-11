from django.contrib.auth.models import User
from ..models import Program, Exercise, MuscleGroup, ExerciseSetDetail, ExerciseWeight, Profile
from rest_framework import viewsets, permissions
from core.serializers import ProgramSerializer, ExerciseSerializer, MuscleGroupSerializer, ExerciseRepsSerializer, ExerciseWeightSerializer, ProfileSerializer
from django.db import connection

from django.http import JsonResponse

# TODO: need security?? later


def get_program(request, program_id):
    c = connection.cursor()
    try:
        c.execute("BEGIN")
        c.callproc("get_program", [program_id, ])
        results = c.fetchall()
        row_headers = [x[0] for x in c.description]

        c.execute("COMMIT")
    finally:
        c.close()
    json_data = []
    for result in results:
        json_data.append(dict(zip(row_headers, result)))
    print(json_data[0])

    return JsonResponse(json_data[0], safe=False)


def get_program_detail(request, program_id):
    c = connection.cursor()
    try:
        c.execute("BEGIN")
        c.callproc("get_program_detail", [program_id, ])
        results = c.fetchall()
        row_headers = [x[0] for x in c.description]

        c.execute("COMMIT")
    finally:
        c.close()
    json_data = []
    for result in results:
        json_data.append(dict(zip(row_headers, result)))
    print(json_data)

    return JsonResponse(json_data, safe=False)
