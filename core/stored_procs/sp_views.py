from django.contrib.auth.models import User
from ..models import Program, Exercise, MuscleGroup, ExerciseSetDetail, ExerciseWeight, Profile
from rest_framework import viewsets, permissions
from django.db import connection
import json
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie

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

    return JsonResponse(json_data, safe=False)


def get_exercises(request):
    c = connection.cursor()
    try:
        c.execute("BEGIN")
        c.callproc("get_exercises")
        results = c.fetchall()
        row_headers = [x[0] for x in c.description]
        c.execute("COMMIT")
    finally:
        c.close()
    json_data = []
    for result in results:
        json_data.append(dict(zip(row_headers, result)))

    return JsonResponse(json_data, safe=False)


# TODO: make stored_proc accept array of json.
@ensure_csrf_cookie
def update_program_detail(request):
    if request.method == 'POST':
        # print(request.body)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        current_program_id = None

        c = connection.cursor()
        try:
            c.execute("BEGIN")
            for exercise in body:
                # set current program_id
                if not current_program_id:

                    current_program_id = exercise['program_id']
                # exercise_set_detail is new
                if not exercise['exercise_set_detail_id']:
                    print("#####")
                    print(exercise)
                    c.callproc("insert_exercise_set_detail",
                               [
                                   exercise['exercise_id'],
                                   exercise['sets'],
                                   exercise['reps'],
                                   exercise['exercise_order'],
                                   current_program_id,
                               ])

            # get all after insert
            c.callproc("get_program_detail", [current_program_id, ])
            results = c.fetchall()
            row_headers = [x[0] for x in c.description]
            c.execute("COMMIT")
        finally:
            c.close()
        json_data = []
        for result in results:
            json_data.append(dict(zip(row_headers, result)))

        return JsonResponse(json_data, safe=False)


def delete_exerciseSetDetail(request):
    if request.method == 'POST':
        print("deLETE")
        print(request.body)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if len(body) > 0:
            c = connection.cursor()
            try:
                c.execute("BEGIN")
                for exercise_set_detail_id in body:
                    print("##", exercise_set_detail_id,
                          type(exercise_set_detail_id))
                    c.callproc("delete_exercise_set_detail",
                               [int(exercise_set_detail_id), ])
                c.execute("COMMIT")
            finally:
                c.close()
            # json_data = []
            # for num in body:
            #     json_data.append({"exercise_set_detail_id": num})
        return JsonResponse(body, safe=False)
