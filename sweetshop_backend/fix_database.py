#!/usr/bin/env python
"""
Script to fix database issues and run migrations
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

from django.core.management import execute_from_command_line

def fix_database():
    """Fix database by running migrations"""
    print("🔧 Fixing database...")
    
    try:
        # Run migrations
        print("📦 Running migrations...")
        execute_from_command_line(['manage.py', 'migrate'])
        print("✅ Migrations completed successfully!")
        
        # Create media folders
        print("\n📁 Creating media folders...")
        media_dir = BASE_DIR / 'media'
        sweets_dir = media_dir / 'sweets'
        
        media_dir.mkdir(exist_ok=True)
        sweets_dir.mkdir(exist_ok=True)
        print(f"✅ Created: {media_dir}")
        print(f"✅ Created: {sweets_dir}")
        
        print("\n🎉 Database fixed successfully!")
        print("\n📝 Next steps:")
        print("1. Install Pillow: pip install Pillow")
        print("2. Start server: python manage.py runserver")
        print("3. Access admin at: http://127.0.0.1:8000/admin/")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n🔧 Manual steps:")
        print("1. Run: python manage.py makemigrations")
        print("2. Run: python manage.py migrate")
        print("3. Install Pillow: pip install Pillow")

if __name__ == '__main__':
    fix_database() 