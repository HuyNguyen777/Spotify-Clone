from django.http import JsonResponse
from django.shortcuts import render
from .models import Role# Create your views here.


#load ds rolerole
def load_roles(request):
    roles = Role.objects.all().values('role_id', 'role_name', 'deception')
    return JsonResponse(list(roles), safe=False)