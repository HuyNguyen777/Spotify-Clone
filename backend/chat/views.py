from django.http import JsonResponse
import json
from rest_framework.response import Response

from chat.models import Message
from users.models import User
from rest_framework.decorators import action

from django.views.decorators.csrf import csrf_exempt
from rest_framework import status,viewsets

from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView


class MessageViewSet(viewsets.ModelViewSet):
    @csrf_exempt
    def create_chat(request):
        """
        Tạo chat giữa hai người dùng.
        """
        if request.method == 'POST':
            try:
                data = json.loads(request.body.decode('utf-8'))

                # Lấy dữ liệu từ request
                user1id = data.get('user1_id')
                user2id = data.get('user2_id')

               
                # Tạo chat mới trong database
                chat = Message.objects.create(
                    user1_id_id=user1id,  # Gán trực tiếp user_id
                    user2_id_id=user2id,  # Gán trực tiếp user_id
                )

                # Trả về response thành công
                return JsonResponse({'message': 'Create chat success', 'chat_id': chat.id}, status=201)
            
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid JSON data'}, status=400)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)

        return JsonResponse({'error': 'Invalid request method'}, status=400)
    @api_view(['GET'])
    def check_chat_exists( request):
        user1_id = request.query_params.get('user1_id')
        user2_id = request.query_params.get('user2_id')

        if not user1_id or not user2_id:
            return Response({'error': 'Missing user IDs'}, status=status.HTTP_400_BAD_REQUEST)

        chat = Message.objects.filter(
            user1_id=user1_id, user2_id=user2_id
        ).first() or Message.objects.filter(
            user1_id=user2_id, user2_id=user1_id
        ).first()

        if chat:
            return Response({'exists': True, 'chat_id': chat.id})
        return Response({'exists': False})
