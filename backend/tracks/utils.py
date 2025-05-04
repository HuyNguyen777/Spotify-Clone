import os
from django.conf import settings

def copy_file_to_public(source_folder: str, filename: str, dest_folder: str) -> bool:
    
    #Copy file từ media vào thư mục public (ví dụ: mp3 hoặc images).
    source_path = os.path.join(settings.MEDIA_ROOT, source_folder, filename)
    dest_path = os.path.join(dest_folder, filename)

    os.makedirs(dest_folder, exist_ok=True)

    if not os.path.exists(source_path):
        print(f"Không tìm thấy file: {source_path}")
        return False

    try:
        with open(source_path, 'rb') as src_file, open(dest_path, 'wb') as dst_file:
            dst_file.write(src_file.read())
        print(f"Đã copy {filename} vào {dest_folder}")
        return True
    except Exception as e:
        print("Lỗi khi copy:", e)
        return False


def copy_mp3_to_public(filename: str) -> bool:
    return copy_file_to_public('mp3', filename, settings.ANGULAR_PUBLIC_MP3)

def copy_image_to_public(filename: str) -> bool:
    return copy_file_to_public('images', filename, settings.ANGULAR_PUBLIC_IMAGES)