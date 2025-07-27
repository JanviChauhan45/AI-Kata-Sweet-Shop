# Sweet Shop Backend - Image Handling Setup

This guide explains how to set up image handling for the Sweet Shop backend so that sweet images can be stored and displayed in the React frontend.

## 🚀 Quick Setup

### 1. Install Required Dependencies
```bash
pip install Pillow
```

### 2. Create Media Folders
```bash
python setup_media.py
```

### 3. Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Admin User (Optional)
```bash
python manage.py createsuperuser
```

### 5. Start the Server
```bash
python manage.py runserver
```

## 📁 Folder Structure

After setup, your backend will have this structure:
```
sweetshop_backend/
├── media/
│   └── sweets/          # Sweet images will be stored here
├── api/
│   ├── models.py        # Updated Sweet model with ImageField
│   ├── views.py         # API views for sweet management
│   ├── serializers.py   # Serializers for image handling
│   └── admin.py         # Admin interface for managing sweets
└── setup_media.py       # Setup script
```

## 🖼️ Image Handling Features

### Model Changes
- **Sweet Model**: Updated to use `ImageField` instead of `URLField`
- **Image Path**: Images are stored as `media/sweets/{sweet_id}.{extension}`
- **Image URL**: Automatically generated via the `image_url` property

### API Endpoints
- `GET /api/sweets/` - List all sweets with image URLs
- `GET /api/sweets/{id}/` - Get specific sweet details
- `POST /api/sweets/create/` - Create new sweet (Admin only)
- `PUT /api/sweets/{id}/update/` - Update sweet (Admin only)
- `DELETE /api/sweets/{id}/delete/` - Delete sweet (Admin only)
- `GET /api/categories/` - Get all categories

### Admin Interface
- Sweet management with image upload
- Organized fieldsets for better UX
- Image preview in admin panel

## 📊 Sample Data

The setup script adds these sample sweets:
- Gulab Jamun (Milk based)
- Rasgulla (Milk based)
- Kaju Katli (Dry fruits)
- Barfi (Traditional)
- Jalebi (Traditional)
- Ladoo (Traditional)

## 🔧 Configuration

### Django Settings
- `MEDIA_URL = '/media/'` - URL prefix for media files
- `MEDIA_ROOT = BASE_DIR / 'media'` - File system path for media files
- Media files served in development via URL patterns

### Frontend Integration
The React frontend expects:
- `image_url` field in sweet data
- Full URL path (e.g., `http://127.0.0.1:8000/media/sweets/abc123.jpg`)
- Fallback to placeholder if image fails to load

## 🛠️ Usage Examples

### Adding a Sweet via Admin
1. Go to `http://127.0.0.1:8000/admin/`
2. Login with admin credentials
3. Click "Sweets" → "Add Sweet"
4. Fill in details and upload image
5. Save

### API Usage
```bash
# Get all sweets
curl http://127.0.0.1:8000/api/sweets/

# Create sweet (requires admin token)
curl -X POST http://127.0.0.1:8000/api/sweets/create/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=New Sweet" \
  -F "category=milk" \
  -F "price=250.00" \
  -F "stock=10" \
  -F "unit=kg" \
  -F "description=Delicious sweet" \
  -F "image=@/path/to/image.jpg"
```

## 🔍 Troubleshooting

### Common Issues
1. **Pillow not installed**: Run `pip install Pillow`
2. **Media folder not created**: Run `python setup_media.py`
3. **Images not displaying**: Check `MEDIA_URL` and `MEDIA_ROOT` settings
4. **Permission errors**: Ensure write permissions on media folder

### Development vs Production
- **Development**: Images served by Django development server
- **Production**: Use a proper web server (nginx) to serve media files

## 📝 Notes
- Images are automatically resized and optimized by Django
- File extensions are preserved
- Unique filenames prevent conflicts
- Admin interface provides image preview 