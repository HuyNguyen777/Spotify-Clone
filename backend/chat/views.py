from django.http import JsonResponse
import json
from rest_framework.response import Response
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from chat.models import Message
from chat_message.models import Chat_Message

from users.models import User
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny

from rest_framework import status,viewsets

from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import ensure_csrf_cookie


class MessageViewSet(viewsets.ModelViewSet):
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
    def get_chat_messages(request, chat_id):
        if request.method == 'GET':
            try:
                # Lấy tất cả tin nhắn từ chat theo chat_id
                messages = Chat_Message.objects.filter(chat_id=chat_id)
                data = [
                    {
                        'id': msg.id,
                        'message_text': msg.message_text,
                        'sender_id': msg.sender_id.user_id,
                        'created_at': msg.create_at.isoformat(),
                        'chat_id': msg.chat.id,
                        'is_read': msg.isRead,
                    }
                    for msg in messages
                ]
                return JsonResponse({'messages': data}, status=200)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
        else:
            return JsonResponse({'error': 'Invalid request method'}, status=400)
    
    def chat_messages(request, chat_id):
        if request.method == 'GET':
            try:
                messages = Chat_Message.objects.filter(chat_id=chat_id)
                data = [
                    {
                        'id': msg.id,
                        'message_text': msg.message_text,
                        'sender_id': msg.sender_id.user_id,
                        'created_at': msg.create_at.isoformat(),
                        'chat_id': msg.chat.id,
                        'is_read': msg.isRead,
                    }
                    for msg in messages
                ]
                return JsonResponse({'messages': data}, status=200)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)

        elif request.method == 'POST':
            try:
                body = json.loads(request.body)
                message_text = body.get('message_text')
                sender_id = body.get('sender_id')
                chat = Message.objects.get(id=chat_id)
                sender = User.objects.get(user_id=sender_id)

                new_message = Chat_Message.objects.create(
                    message_text=message_text,
                    sender_id=sender,
                    chat=chat
                )

                data = {
                    'new_message': {
                        'id': new_message.id,
                        'message_text': new_message.message_text,
                        'sender_id': new_message.sender_id.user_id,
                        'chat_id': new_message.chat.id,
                        'created_at': new_message.create_at.isoformat(),
                        'isRead': new_message.isRead,
                        'time': new_message.create_at.strftime('%H:%M'),
                        'date': new_message.create_at.strftime('%Y-%m-%d'),
                    }
                }

                return JsonResponse(data, status=201)

            except Exception as e:
                return JsonResponse({'error': str(e)}, status=400)

        else:
            return JsonResponse({'error': 'Invalid request method'}, status=405)
        
    @api_view(['GET'])
    def get_user_chats(request):
        user_id_str = request.GET.get('user')
        if not user_id_str:
            return Response({'error': 'User ID is required'}, status=400)

        try:
            user_id = int(user_id_str)
            user = User.objects.get(user_id=user_id)
        except (ValueError, User.DoesNotExist):
            return Response({'error': 'Invalid User ID'}, status=400)

        # Lấy các Message mà user tham gia
        chats = Message.objects.filter(
            Q(user1_id=user) | Q(user2_id=user)
        ).order_by('-timestamp')

        data = []
        for chat in chats:
            # Nếu user là user1 thì partner là user2, ngược lại partner là user1
            if chat.user1_id_id == user_id:
                partner = chat.user2_id
            else:
                partner = chat.user1_id

            data.append({
                'chat_id': chat.id,
                'with_user_id': partner.user_id,
                'with_user_name': partner.user_name,
                'last_message_time': chat.timestamp.isoformat(),
            })

        return Response(data, status=200)
    
    @csrf_exempt
    def list_chat(repest):
        if repest.method == 'GET':
            chats = Message.objects.all().values()
            return JsonResponse(list(chats), safe=False)
        else:
            return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
        
    @csrf_exempt
    @api_view(['DELETE'])
    @permission_classes([AllowAny])
    def delete_chat(request, chat_id):
        try:
            chat = Message.objects.get(pk=chat_id)
            chat.delete()
            return Response({'message': 'Chat deleted successfully'}, status=200)
        except Message.DoesNotExist:
            return Response({'error': 'Chat not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)