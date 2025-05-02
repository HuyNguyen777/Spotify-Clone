from django.urls import path
from .views import RoleListCreateView
from .views import RoleDetailView

urlpatterns = [
    path('roles/',RoleListCreateView.as_view()  ,name='role-list-create'),
    path('roles/<int:pk>/', RoleDetailView.as_view(), name='role-detail'),
]