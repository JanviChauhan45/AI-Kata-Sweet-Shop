# 🍬 Kata Sweet Shop Management System

A full-stack web application for managing a sweet shop with customer authentication, product catalog, and purchase management. Built with Django REST Framework backend and React frontend.

## ✨ Features

### 🛍️ Customer Features
- **User Authentication**: Secure login/register with JWT tokens
- **Product Catalog**: Browse sweets with images, descriptions, and pricing
- **Advanced Search & Filtering**: 
  - Search by sweet name
  - Filter by category (dynamic categories)
  - Filter by price range
  - Filter by stock availability
  - Sort by name, price, or stock
- **Purchase System**: 
  - Quantity-based purchasing (kg/grams)
  - Real-time stock updates
  - Out-of-stock indicators
  - Purchase history tracking
- **Responsive Design**: Clean, minimal Bootstrap UI

### 🔧 Admin Features
- **Product Management**: Add, edit, and manage sweets
- **Inventory Control**: Track stock levels and sales
- **User Management**: View customer accounts and purchases
- **Image Upload**: Store product images in backend media folder

## 🏗️ Architecture

```
AI-Kata-Sweet-Shop/
├── sweetshop_backend/          # Django REST API
│   ├── api/                   # Main app with models, views, serializers
│   ├── sweetshop_backend/     # Django project settings
│   └── media/                 # Uploaded images storage
└── sweetshop_frontend/        # React frontend
    ├── src/
    │   ├── components/        # React components
    │   ├── context/           # Authentication context
    │   └── utils/             # API utilities
    └── public/                # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd sweetshop_backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

5. **Load sample data**
   ```bash
   python manage.py create_sample_data
   ```

6. **Start Django server**
   ```bash
   python manage.py runserver
   ```
   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd sweetshop_frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start React development server**
   ```bash
   npm start
   ```
   Frontend will be available at `http://localhost:3000`

## 📊 Database Models

### User Model
```python
- id: AutoField (Primary Key)
- name: CharField
- email: EmailField (Unique)
- password_hash: CharField
- role: CharField (customer/admin)
- created_at: DateTimeField
```

### Sweet Model
```python
- id: AutoField (Primary Key)
- name: CharField
- category: CharField (Dynamic categories)
- description: TextField
- price: DecimalField (per kg)
- quantity: DecimalField (in kg)
- image: ImageField (File upload)
- created_at: DateTimeField
```

### Purchase Model
```python
- id: AutoField (Primary Key)
- user: ForeignKey (User)
- sweet: ForeignKey (Sweet)
- quantity: DecimalField (purchased amount)
- total_price: DecimalField
- purchase_date: DateTimeField
```

## 🔌 API Endpoints

### Authentication
- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `POST /api/logout/` - User logout

### Public Endpoints
- `GET /api/sweets/simple/` - Get all sweets (simple format)
- `GET /api/sweets/public/` - Get all sweets (DRF format)
- `GET /api/sweets/<id>/` - Get specific sweet details

### Protected Endpoints
- `POST /api/sweets/<id>/purchase/` - Purchase a sweet
- `GET /api/purchases/user/` - Get user's purchase history
- `POST /api/purchases/create/` - Create purchase record

### Admin Endpoints
- `GET /api/admin-sweets/` - Admin sweet management
- `POST /api/admin-sweets/` - Create new sweet
- `PUT /api/admin-sweets/<id>/` - Update sweet
- `DELETE /api/admin-sweets/<id>/` - Delete sweet

## 🎨 Frontend Components

### Core Components
- **Welcome.js**: Landing page with login/register
- **CustomerDashboard.js**: Main customer interface
- **AuthContext.js**: Authentication state management
- **api.js**: API utility functions

### Dashboard Sections
- **SweetsSection.js**: Product catalog display
- **SweetsFilters.js**: Search and filter controls
- **QuantitySelector.js**: Purchase quantity modal
- **OrdersSection.js**: Purchase history
- **ProfileSection.js**: User profile management

## 🔧 Configuration

### Backend Settings (`sweetshop_backend/settings.py`)
- **Database**: SQLite (development)
- **Authentication**: JWT tokens
- **CORS**: Configured for frontend communication
- **Media Files**: Local storage for images
- **Permissions**: Public endpoints for customers, protected for admin

### Frontend Configuration
- **API Base URL**: `http://localhost:8000/api/`
- **Authentication**: JWT tokens stored in localStorage
- **Routing**: React Router for navigation
- **Styling**: Bootstrap 5 for responsive design

## 🛠️ Development Commands

### Backend
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load sample data
python manage.py create_sample_data

# Reset database
python manage.py reset_data

# Run tests
python manage.py test
```

### Frontend
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (irreversible)
npm run eject
```

## 📝 Environment Variables

Create a `.env` file in the backend directory:
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 🐛 Troubleshooting

### Common Issues

1. **"Authentication credentials were not provided"**
   - Check if JWT authentication is properly configured
   - Verify token is being sent in request headers

2. **"Failed to load sweets"**
   - Ensure backend server is running on port 8000
   - Check CORS settings in Django
   - Verify API endpoints are accessible

3. **Database migration errors**
   - Run `python manage.py makemigrations`
   - Run `python manage.py migrate`
   - Check model field changes

4. **Image upload issues**
   - Ensure `Pillow` is installed
   - Check media folder permissions
   - Verify `MEDIA_URL` and `MEDIA_ROOT` settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Django REST Framework for robust API development
- React for dynamic frontend components
- Bootstrap for responsive UI design
- JWT for secure authentication

---

**Made with ❤️ for Sweet Shop Management** 