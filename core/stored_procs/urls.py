from django.urls import path, include
from knox import views as knox_views
from . import sp_views
# urlpatterns = [
#     path('api/auth', include('knox.urls')),
#     path('api/auth/register', RegisterAPI.as_view()),
#     path('api/auth/login', LoginAPI.as_view()),
#     path('api/auth/user', UserAPI.as_view()),
#     path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')

# ]

urlpatterns = [

    # path(r'^my_page/$', test)
    path(r'get-program/<int:program_id>', sp_views.get_program),
    path(r'get-program-detail/<int:program_id>', sp_views.get_program_detail),
    path(r'get-exercises/', sp_views.get_exercises)

]
