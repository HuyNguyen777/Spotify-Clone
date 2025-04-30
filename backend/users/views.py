from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User as CustomUser
import json
from django.contrib.auth.hashers import make_password,check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view

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
