# Generated by Django 3.1 on 2022-06-18 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(default='user_images/avatar.png', null=True, upload_to='user_images'),
        ),
    ]