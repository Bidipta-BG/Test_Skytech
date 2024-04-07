from django.contrib import admin
from django.urls import path, include
from api.views import UserViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]