from django.db import models

# Create your models here.
class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=255)
    deception = models.TextField(null=True, blank=True)
    class Meta:
        db_table = 'role' 
    def __str__(self):
        return self.role_name
