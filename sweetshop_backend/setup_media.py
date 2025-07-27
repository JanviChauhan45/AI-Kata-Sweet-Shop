#!/usr/bin/env python
"""
Setup script to create media folders and add sample data
"""
import os
import sys
import django
from pathlib import Path

# Add the project directory to Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sweetshop_backend.settings')
django.setup()

from api.models import Sweet

def create_media_folders():
    """Create media folders if they don't exist"""
    media_dir = BASE_DIR / 'media'
    sweets_dir = media_dir / 'sweets'
    
    # Create directories
    media_dir.mkdir(exist_ok=True)
    sweets_dir.mkdir(exist_ok=True)
    
    print(f"✅ Created media folders:")
    print(f"   - {media_dir}")
    print(f"   - {sweets_dir}")

def add_sample_sweets():
    """Add sample sweet data"""
    sample_sweets = [
        {
            'name': 'Gulab Jamun',
            'category': 'milk',
            'price': 280.00,
            'stock': 15,
            'unit': 'kg',
            'description': 'Soft milk dumplings soaked in sugar syrup, a classic Indian dessert.'
        },
        {
            'name': 'Rasgulla',
            'category': 'milk',
            'price': 320.00,
            'stock': 12,
            'unit': 'kg',
            'description': 'Spongy cottage cheese balls in light sugar syrup.'
        },
        {
            'name': 'Kaju Katli',
            'category': 'dry',
            'price': 450.00,
            'stock': 8,
            'unit': 'kg',
            'description': 'Rich cashew fudge with silver leaf decoration.'
        },
        {
            'name': 'Barfi',
            'category': 'traditional',
            'price': 380.00,
            'stock': 10,
            'unit': 'kg',
            'description': 'Traditional milk-based sweet with cardamom flavor.'
        },
        {
            'name': 'Jalebi',
            'category': 'traditional',
            'price': 220.00,
            'stock': 20,
            'unit': 'kg',
            'description': 'Crispy spiral-shaped sweet soaked in sugar syrup.'
        },
        {
            'name': 'Ladoo',
            'category': 'traditional',
            'price': 300.00,
            'stock': 18,
            'unit': 'kg',
            'description': 'Round sweet balls made from gram flour and sugar.'
        }
    ]
    
    created_count = 0
    for sweet_data in sample_sweets:
        sweet, created = Sweet.objects.get_or_create(
            name=sweet_data['name'],
            defaults=sweet_data
        )
        if created:
            created_count += 1
            print(f"✅ Created: {sweet.name}")
        else:
            print(f"⏭️  Skipped: {sweet.name} (already exists)")
    
    print(f"\n📊 Summary: {created_count} new sweets added")

if __name__ == '__main__':
    print("🚀 Setting up Sweet Shop Backend...\n")
    
    # Create media folders
    create_media_folders()
    print()
    
    # Add sample data
    add_sample_sweets()
    print()
    
    print("🎉 Setup completed successfully!")
    print("\n📝 Next steps:")
    print("1. Install Pillow: pip install Pillow")
    print("2. Run migrations: python manage.py makemigrations && python manage.py migrate")
    print("3. Create admin user: python manage.py createsuperuser")
    print("4. Start server: python manage.py runserver")
    print("5. Access admin at: http://127.0.0.1:8000/admin/")
    print("6. API endpoints available at: http://127.0.0.1:8000/api/") 