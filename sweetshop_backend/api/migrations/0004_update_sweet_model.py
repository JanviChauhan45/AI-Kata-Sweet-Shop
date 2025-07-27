# Generated manually to update Sweet model

from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_initial'),
    ]

    operations = [
        # Rename quantity to stock
        migrations.RenameField(
            model_name='sweet',
            old_name='quantity',
            new_name='stock',
        ),
        # Add unit field
        migrations.AddField(
            model_name='sweet',
            name='unit',
            field=models.CharField(default='kg', max_length=10),
        ),
        # Change image_url to image field
        migrations.RenameField(
            model_name='sweet',
            old_name='image_url',
            new_name='image',
        ),
        migrations.AlterField(
            model_name='sweet',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='sweets/'),
        ),
    ] 