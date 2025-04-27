from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User as CustomUser
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.hashers import make_password

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

            password_hash = make_password(password)

            if CustomUser.objects.filter(user_name=user_name).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            user = CustomUser.objects.create(
                user_name=user_name,
                passwordhash=password_hash,
                fullname=fullname,
                birthday=birthday,
                email=email,
                phone=phone,
                role_id=2   # <<== thêm dòng này nè
            )

            return JsonResponse({'message': 'User registered successfully'}, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
