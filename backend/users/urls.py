# users/urls.py
from django.urls import path
from . import views
from .views import search_users


urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('search/', search_users, name='search-users'),
    path('get-user_id/', views.GetUsernameByTokenView.as_view(), name='get-username-by-token'),
    path('get-user/', views.GetUserByTokenView.as_view()),
    path('', views.list_users, name='list_users'),
    path('create-user/', views.create_user, name='create_user'),
    path('<int:user_id>/update/', views.update_user, name='update_user'),
    path('<int:user_id>/delete/', views.delete_user, name='delete_user'),

]
