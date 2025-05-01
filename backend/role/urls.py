from django.urls import path
from .views import load_roles

urlpatterns = [
    path('roles/', load_roles, name='load_roles'),
]