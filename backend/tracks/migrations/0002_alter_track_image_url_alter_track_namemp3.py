# Generated by Django 5.1.7 on 2025-05-04 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='image_url',
            field=models.ImageField(default=1, upload_to='images/'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='track',
            name='namemp3',
            field=models.FileField(upload_to='mp3/'),
        ),
    ]
