# Generated by Django 5.1.7 on 2025-07-28 00:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_sweet_description_sweet_image_url_purchase'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sweet',
            name='image_url',
        ),
        migrations.AddField(
            model_name='sweet',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='sweets/'),
        ),
    ]
