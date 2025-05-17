from users.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User as CustomUser
import json
from django.contrib.auth.hashers import make_password,check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from users.serializers import UserSerializer  
from rest_framework.views import APIView


@csrf_exempt
def list_users(request):
    if request.method == 'GET':
        users = User.objects.all().values()  
        return JsonResponse(list(users), safe=False)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@api_view(['POST'])
def create_user(request):
    data = request.data

    if User.objects.filter(user_name=data.get('user_name')).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create(
            user_name=data.get('user_name'),
            passwordhash=make_password(data.get('password')),
            fullname=data.get('fullname', ''),
            birthday=data.get('birthday', None),
            email=data.get('email', ''),
            phone=data.get('phone', ''),
            image_user=data.get('image_user', ''),
            is_active=data.get('is_active', True),
            role_id=data.get('role')  # phải chắc chắn role_id hợp lệ
        )
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        print("lOI", e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT', 'PATCH'])
def update_user(request, user_id):
    try:
        user = User.objects.get(user_id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data

    user.user_name = data.get('user_name', user.user_name)
    if data.get('password'):
        user.passwordhash = make_password(data['password'])  # mã hóa nếu có đổi pass
    user.fullname = data.get('fullname', user.fullname)
    user.birthday = data.get('birthday', user.birthday)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.image_user = data.get('image_user', user.image_user)
    user.is_active = data.get('is_active', user.is_active)
    user.role_id = data.get('role', user.role_id)

    user.save()
    return Response({'message': 'User updated successfully'}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_user(request, user_id):
    try:
        user = User.objects.get(user_id=user_id)
        user.delete()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))

            user_name = data.get('user_name')
            password = data.get('password')
            fullname = data.get('fullname', '')
            birthday = data.get('birthday', '')
            email = data.get('email', '')
            phone = data.get('phone', '')

            password_hash = make_password(password)  # Mã hóa mật khẩu

            if CustomUser.objects.filter(user_name=user_name).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            # Tạo người dùng mới
            user = CustomUser.objects.create(
                user_name=user_name,
                passwordhash=password_hash,
                fullname=fullname,
                birthday=birthday,
                email=email,
                phone=phone,
                role_id=2  # Đảm bảo bạn đã có role_id phù hợp
            )

            return JsonResponse({'message': 'User registered successfully'}, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)



@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Kiểm tra nếu người dùng tồn tại
    user = CustomUser.objects.filter(user_name=username).first()
    if user is not None:
        # Kiểm tra mật khẩu hash
        if check_password(password, user.passwordhash):
            # Tạo refresh token và access token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Lưu access token và refresh token vào bảng User
            user.accesstoken = access_token
            user.refreshtoken = refresh_token
            user.save()  # Lưu các thay đổi vào cơ sở dữ liệu

            return Response({
                'access': access_token,
                'refresh': refresh_token,
                'role_id': user.role.role_id
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=400)
    else:
        return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['GET'])
def search_users(request):
    query = request.GET.get('q', '').strip()
    exclude = request.GET.get('exclude')  # Lấy giá trị 'exclude' từ query params
    results = []

    if query:
        qs = User.objects.filter(user_name__icontains=query)
        # Kiểm tra nếu exclude được truyền và hợp lệ
        if exclude:
            qs = qs.exclude(user_id=exclude)  # Loại bỏ user có user_id trùng với 'exclude'
        
        # Trả về user_id và user_name
        results = [{'user_id': u.user_id, 'user_name': u.user_name} for u in qs]

    return Response(results)


class GetUsernameByTokenView(APIView):
    def get(self, request):
        token = request.query_params.get('access_token')
        if not token:
            return Response({'error': 'Access token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(accesstoken=token)
            return Response({'user_id': user.user_id}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
class GetUserByTokenView(APIView):
    def get(self, request):
        token = request.query_params.get('access_token')
        if not token:
            return Response({'error': 'Access token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(accesstoken=token)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)