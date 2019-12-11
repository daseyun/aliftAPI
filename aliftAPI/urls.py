"""aliftAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from core import views
from core.stored_procs import sp_views

router = routers.DefaultRouter()
router.register(r'profiles', views.ProfileViewSet)
router.register(r'muscleGroups', views.MuscleGroupViewSet)
router.register(r'programs', views.ProgramViewSet, basename='Program')
router.register(r'exercises', views.ExerciseViewSet)
router.register(r'exerciseSetDetail', views.ExerciseRepsViewSet)
router.register(r'exerciseWeight', views.ExerciseWeightViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include('frontend.urls')),
    path('api/', include(router.urls)),
    path('', include('accounts.urls')),
    path('proc/', include('core.stored_procs.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
