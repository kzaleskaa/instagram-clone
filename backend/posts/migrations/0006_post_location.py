# Generated by Django 3.1 on 2022-06-18 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_auto_20220619_0104'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='location',
            field=models.TextField(blank=True, default=''),
        ),
    ]
