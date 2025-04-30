# users/urls.py
from django.urls import path
from . import views
from .views import search_users


urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('search/', search_users, name='search-users'),


]
