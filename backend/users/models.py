from django.db import models
from role.models import Role
# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=255, unique=True)
    passwordhash = models.CharField(max_length=255)
    fullname = models.CharField(max_length=255, null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    accesstoken = models.TextField(null=True, blank=True)
    refreshtoken = models.TextField(null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    image_user = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    class Meta:
        db_table = 'users' 
    def __str__(self):
        return self.user_name
