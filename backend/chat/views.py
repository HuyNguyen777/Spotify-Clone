from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Message
from .serializers import MessageSerializer
from users.models import User
from rest_framework import status

class MessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        receiver_username = request.data.get('receiver')
        content = request.data.get('content')
        try:
            receiver = User.objects.get(username=receiver_username)
        except User.DoesNotExist:
            return Response({'error': 'Receiver not found'}, status=status.HTTP_404_NOT_FOUND)

        message = Message.objects.create(sender=request.user, receiver=receiver, content=content)
        return Response(MessageSerializer(message).data, status=status.HTTP_201_CREATED)

    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        messages = Message.objects.filter(
            sender__in=[request.user, user],
            receiver__in=[request.user, user]
        ).order_by('timestamp')

        return Response(MessageSerializer(messages, many=True).data)
