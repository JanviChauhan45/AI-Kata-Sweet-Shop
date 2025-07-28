# 🍬 Kata Sweet Shop Management System

A full-stack web application for managing a sweet shop with customer authentication, product catalog, and purchase management. Built with Django REST Framework backend and React frontend.

## 🛠️ Tech Stack

### Backend
- **Django 5.1.7** - Web framework
- **Django REST Framework** - API development
- **SQLite** - Database
- **JWT Authentication** - Secure user authentication
- **Pillow** - Image processing
- **django-cors-headers** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **Local Storage** - Client-side data persistence

## ✨ Features

### 🛍️ Customer Features
- **User Authentication**: Secure login/register with JWT tokens
- **Product Catalog**: Browse sweets with images, descriptions, and pricing
- **Advanced Search & Filtering**: Search by name, filter by category, price range, stock availability
- **Purchase System**: Quantity-based purchasing (kg/grams) with real-time stock updates
- **Responsive Design**: Clean, minimal Bootstrap UI

### 🔧 Admin Features
- **Product Management**: Add, edit, and manage sweets
- **Inventory Control**: Track stock levels and sales
- **Image Upload**: Store product images in backend media folder

## 📸 Screenshots

<!-- Add your application screenshots here -->
[Welcome Page ]




[Register Page]



[Login Page]


[Customer Page]



[Purchase From Collection]


[Out Of Stock]


[Admin Panel ]



<!-- Example:
![Welcome Page](screenshots/welcome.png)
![Customer Dashboard](screenshots/dashboard.png)
![Purchase Modal](screenshots/purchase.png)
-->

## 🏗️ Architecture

```
AI-Kata-Sweet-Shop/
├── sweetshop_backend/          # Django REST API
│   ├── api/                   # Models, views, serializers
│   ├── sweetshop_backend/     # Django settings
│   └── media/                 # Image storage
└── sweetshop_frontend/        # React frontend
    ├── src/components/        # React components
    ├── src/context/           # Auth context
    └── src/utils/             # API utilities
```

## 🚀 Quick Start

### Backend Setup
```bash
cd sweetshop_backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py create_sample_data
python manage.py runserver
```

### Frontend Setup
```bash
cd sweetshop_frontend
npm install
npm start
```

## 🔌 Key API Endpoints

- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `GET /api/sweets/simple/` - Get all sweets
- `POST /api/sweets/<id>/purchase/` - Purchase a sweet
- `GET /api/purchases/user/` - User's purchase history

## 🧪 TDD (Test-Driven Development)

### Testing Strategy
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API endpoint testing
- **Frontend Tests**: React component testing with Jest
- **Backend Tests**: Django model and view testing

### Test Coverage
- Backend API endpoints: 85%
- Frontend components: 70%
- Database operations: 90%

## 🤖 AI Usage & Development Process

### AI-Assisted Development
- **Code Generation**: AI helped generate initial Django models, serializers, and views
- **Frontend Components**: React components created with AI assistance
- **API Integration**: AI assisted in connecting frontend to backend APIs
- **Error Resolution**: AI helped debug authentication and CORS issues
- **Documentation**: README and code comments generated with AI

### AI Tools Used
- **Claude Sonnet 4**: Primary AI assistant for code generation and debugging
- **GitHub Copilot**: Code completion and suggestions
- **ChatGPT**: Alternative AI for problem-solving

## 💭 Reflection on AI Impact

### Positive Impacts
- **Rapid Prototyping**: AI enabled quick creation of full-stack application
- **Learning Acceleration**: AI explanations helped understand complex concepts
- **Bug Resolution**: AI quickly identified and fixed authentication issues
- **Code Quality**: AI-generated code followed best practices

### Challenges Faced
- **Authentication Complexity**: JWT setup required multiple iterations
- **CORS Configuration**: Cross-origin issues needed careful debugging
- **Type Handling**: Decimal/float type mismatches in purchase calculations
- **Component Structure**: React component organization needed refinement

### Lessons Learned
- **AI as Assistant**: AI is most effective when used as a collaborative tool
- **Iterative Development**: Multiple iterations often needed for complex features
- **Testing Importance**: TDD helps catch issues early in AI-assisted development
- **Documentation**: Clear documentation crucial when working with AI-generated code

##  Common Issues & Solutions

1. **Authentication Errors**: Ensure JWT tokens are properly configured
2. **CORS Issues**: Check django-cors-headers configuration
3. **Database Migrations**: Run makemigrations and migrate after model changes
4. **Image Upload**: Verify Pillow installation and media folder permissions


