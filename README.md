# 🎧 Spotify Clone Backend (Django)

Dự án backend cho ứng dụng Spotify Clone, xây dựng bằng Django 5.1.7, hỗ trợ API REST, JWT, WebSocket (chat real-time), và quản lý metadata nhạc.

---

## 🚀 Tính năng nổi bật

- ✅ Quản lý bài hát (tracks), albums, nghệ sĩ (artists)
- ✅ Tạo và quản lý playlist
- ✅ Hệ thống người dùng với phân quyền và đăng nhập bằng JWT
- ✅ Hệ thống chat real-time qua WebSocket (Django Channels + Redis)
- ✅ Kết nối frontend Angular qua CORS

---

## 🧱 Công nghệ sử dụng

- **Python 3.10+**
- **Django 5.1.7**
- **Django REST Framework**
- **JWT (Simple JWT)**
- **Channels + Redis (WebSocket)**
- **MySQL**
- **Mutagen (metadata nhạc)**
- **Angular (frontend)**

---

## ⚙️ Cài đặt & cấu hình

### 1. Clone dự án

```bash
git clone https://github.com/your-username/spotify-clone-backend.git
cd spotify-clone-backend
```

### 2. Cài dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Cấu hình database MySQL

Tạo database tên `spotify_clone` và cập nhật `settings.py` nếu cần:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'spotify_clone',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
```

### 4. Migrate & tạo superuser

```bash
python manage.py makemigrations
python manage.py migrate

```

---

## 🧪 Chạy Redis (WebSocket)

Redis là bắt buộc nếu bạn dùng `channels` cho chat.

### Ubuntu/macOS:

```bash
sudo service redis-server start
```

### Hoặc:

```bash
redis-server
```

---

## ▶️ Chạy server

```bash
python manage.py runserver
```

Server chạy tại: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 📁 Cấu trúc thư mục chính

```bash
├── backend/
│   ├── settings.py
│   ├── urls.py
│   └── asgi.py          # Hỗ trợ WebSocket
│
├── albums/
├── artists/
├── tracks/
├── playlists/
├── users/
├── chat/
├── chat_message/
├── ...
├── media/               # Thư mục lưu trữ file upload
├── requirements.txt
└── README.md
```

---

## 📦 requirements.txt

```txt
Django==5.1.7
djangorestframework
djangorestframework-simplejwt
channels
channels_redis
mysqlclient
django-cors-headers
mutagen
```

---

## 💡 Ghi chú

- Bạn cần cài MySQL và Redis trước khi chạy server.
- Đảm bảo frontend Angular chạy ở `http://localhost:4200` để tránh lỗi CORS.

---



