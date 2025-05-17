# chat/urls.py
from django.urls import path
from . import views
from . import consumers
urlpatterns = [
   
    path('check/', views.MessageViewSet.check_chat_exists, name='check_chat'),
    path('create_chat/', views.MessageViewSet.create_chat, name='create_chat'),
    path('<int:chat_id>/messages/', views.MessageViewSet.chat_messages),
    path('get-user-chats/', views.MessageViewSet.get_user_chats, name='get_user_chats'),
    path('', views.MessageViewSet.list_chat, name='list_chat'),
]
