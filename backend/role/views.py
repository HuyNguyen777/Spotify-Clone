from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Role
from .serializers import RoleSerializer# Create your views here.


#load ds rolerole
class RoleListView(APIView):
    def get(self, request):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)    
    
    def post(self, request):
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class RoleRetrieveUpdateDestroyView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Role, pk = pk)