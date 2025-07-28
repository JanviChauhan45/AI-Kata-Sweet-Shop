# Kata: Sweet Shop Frontend

A React-based frontend for the Sweet Shop Management System.

## Features

- Clean and modern UI with Bootstrap CSS
- User authentication (Login/Register)
- Responsive design
- JWT token-based authentication
- Dashboard with role-based access

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Auth.css
│   ├── Welcome/
│   │   ├── Welcome.js
│   │   └── Welcome.css
│   └── Dashboard/
│       ├── Dashboard.js
│       └── Dashboard.css
├── App.js
├── App.css
└── index.js
```

## Pages

### Welcome Page (`/`)
- Login form with email and password
- Registration form with name, email, password, and role selection
- Tab-based navigation between login and register
- Beautiful gradient background

### Dashboard (`/dashboard`)
- Protected route requiring authentication
- User information display
- Navigation menu
- Quick access cards for different sections

## Authentication

The frontend uses JWT tokens for authentication:
- Access tokens are stored in localStorage
- Automatic redirect to login if not authenticated
- Logout functionality clears all stored data

## API Integration

The frontend connects to the Django backend at `http://localhost:8000`:
- Login: `POST /api/auth/login/`
- Register: `POST /api/auth/register/`
- Token refresh: `POST /api/auth/refresh/`

## Dependencies

- React 19.1.0
- React Router DOM 6.8.0
- Bootstrap 5.3.2
- Axios 1.6.0

## Development

To start development:
1. Ensure the Django backend is running on port 8000
2. Run `npm start` to start the React development server
3. The frontend will automatically reload when you make changes
