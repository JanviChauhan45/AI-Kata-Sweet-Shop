# Sweet Shop Frontend

A modern React frontend for the Sweet Shop application with clean, simple, and well-documented code.

## 🚀 Features

- **Clean & Simple Code**: Well-documented components with clear structure
- **Error Handling**: Graceful fallback when API is unavailable
- **Responsive Design**: Works on desktop and mobile devices
- **Search & Filter**: Find sweets by name, description, or category
- **Cart Integration**: Add sweets to cart with authentication
- **Loading States**: User-friendly loading indicators

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── Dashboard.js          # Main dashboard component
│   │   ├── Dashboard.css         # Dashboard styles
│   │   └── sections/
│   │       ├── SweetsSection.js  # Sweets display and management
│   │       ├── OrdersSection.js  # Order history
│   │       └── ProfileSection.js # User profile management
│   ├── Login.js                  # Login component
│   └── Register.js               # Registration component
├── context/
│   └── AuthContext.js            # Authentication context
├── utils/
│   └── api.js                    # API utility functions
└── App.js                        # Main app component
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd sweetshop_frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### API Configuration
The API base URL is configured in `src/utils/api.js`:
```javascript
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

### Environment Variables
Create a `.env` file in the frontend root directory:
```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

## 📖 Usage

### Authentication
1. **Register**: Create a new account with name, email, and password
2. **Login**: Sign in with your email and password
3. **Token Storage**: Authentication tokens are stored in localStorage

### Browsing Sweets
1. **View Collection**: See all available sweets with images and details
2. **Search**: Use the search bar to find specific sweets
3. **Filter by Category**: Click category buttons to filter sweets
4. **View Details**: Click "View Details" to see full information

### Shopping Cart
1. **Add to Cart**: Click "Add to Cart" on any sweet (requires login)
2. **Stock Check**: Items show stock levels and disable when out of stock
3. **Cart Management**: View and manage items in your cart

## 🎨 Styling

The application uses clean, modern CSS with:
- **Responsive Grid**: Adapts to different screen sizes
- **Hover Effects**: Interactive elements with smooth transitions
- **Color Coding**: Visual indicators for stock levels and status
- **Emoji Icons**: User-friendly visual elements

## 🔍 Error Handling

The application includes comprehensive error handling:

### API Errors
- **Network Issues**: Shows fallback data when API is unavailable
- **Authentication Errors**: Prompts user to login when required
- **Server Errors**: Displays user-friendly error messages

### Fallback Data
When the API is unavailable, the app shows sample data:
- Sample sweets (Gulab Jamun, Rasgulla, Jalebi)
- Sample categories (Traditional, Modern, Diabetic)

## 🧪 Development

### Code Quality
- **JSDoc Comments**: All functions are documented
- **Consistent Naming**: Clear, descriptive variable and function names
- **Modular Structure**: Reusable components and utilities

### Adding New Features
1. **Create Component**: Add new components in the appropriate directory
2. **Update API**: Add new endpoints to `src/utils/api.js`
3. **Add Styles**: Update CSS files for new components
4. **Test**: Verify functionality and error handling

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy
The `build` folder contains the production-ready files that can be deployed to any static hosting service.

## 📝 API Endpoints

The frontend communicates with these backend endpoints:

- `GET /api/sweets/` - Get all sweets
- `GET /api/categories/` - Get sweet categories
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/cart/add/` - Add item to cart

## 🤝 Contributing

1. Follow the existing code style and documentation
2. Add JSDoc comments for new functions
3. Test error handling scenarios
4. Ensure responsive design works on mobile

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Verify the backend API is running
3. Check network connectivity
4. Review the API documentation

---

**Happy Coding! 🍬✨**
