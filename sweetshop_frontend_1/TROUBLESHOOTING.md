# Troubleshooting Guide

This guide helps you resolve common issues with the Sweet Shop frontend.

## 🚨 Common Issues

### 1. "Failed to load sweets. Please try again."

**Symptoms:**
- Error message appears on the sweets page
- No sweets are displayed
- Console shows API errors

**Possible Causes:**
- Backend server is not running
- Database migration issues
- Network connectivity problems
- CORS configuration issues

**Solutions:**

#### A. Check Backend Server
```bash
# Navigate to backend directory
cd sweetshop_backend

# Start the server
python manage.py runserver
```

#### B. Fix Database Issues
If you see "no such column: api_sweet.stock" error:
```bash
# Apply pending migrations
python manage.py migrate

# Check migration status
python manage.py showmigrations
```

#### C. Check Network
- Ensure backend is running on `http://127.0.0.1:8000`
- Check if port 8000 is available
- Verify firewall settings

#### D. CORS Issues
If you see CORS errors in console:
1. Ensure Django CORS headers are installed
2. Check `settings.py` for CORS configuration
3. Restart both frontend and backend servers

### 2. Authentication Issues

**Symptoms:**
- Can't login or register
- "Please login to add items to cart" message
- Token errors in console

**Solutions:**

#### A. Clear Browser Storage
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
```

#### B. Check Token Storage
```javascript
// Check if token exists
console.log(localStorage.getItem('token'));
```

#### C. Verify API Endpoints
- Ensure `/api/auth/login/` and `/api/auth/register/` are working
- Check backend logs for authentication errors

### 3. Images Not Loading

**Symptoms:**
- Sweet images show placeholder (🍬)
- Image URLs are broken
- Console shows 404 errors for images

**Solutions:**

#### A. Check Media Files
```bash
# In backend directory
python manage.py collectstatic
```

#### B. Verify Media URL Configuration
Check `settings.py`:
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

#### C. Check URL Patterns
Ensure media URLs are configured in `urls.py`:
```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... your URL patterns
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 4. Search and Filter Not Working

**Symptoms:**
- Search box doesn't filter results
- Category filters don't work
- No results found even when sweets exist

**Solutions:**

#### A. Check JavaScript Console
Look for errors in browser console (F12)

#### B. Verify Data Structure
Ensure sweets have the expected fields:
```javascript
{
  id: "1",
  name: "Sweet Name",
  category: "Traditional",
  description: "Description text",
  price: "100.00",
  stock: 10,
  unit: "kg"
}
```

#### C. Test Search Logic
```javascript
// In browser console, test the search
const sweets = [/* your sweets data */];
const searchTerm = "gulab";
const filtered = sweets.filter(sweet => 
  sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
);
console.log(filtered);
```

### 5. Add to Cart Not Working

**Symptoms:**
- Clicking "Add to Cart" does nothing
- Error messages about cart
- Items not appearing in cart

**Solutions:**

#### A. Check Authentication
- Ensure user is logged in
- Verify token is valid
- Check if token is expired

#### B. Verify Cart API
- Check if `/api/cart/add/` endpoint exists
- Verify request format
- Check backend logs for errors

#### C. Test Cart API Manually
```bash
# Test with curl
curl -X POST http://127.0.0.1:8000/api/cart/add/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sweet_id": "1", "quantity": 1}'
```

## 🔧 Development Issues

### 1. React Development Server Issues

**Symptoms:**
- `npm start` fails
- Port 3000 is already in use
- Module not found errors

**Solutions:**

#### A. Clear Node Modules
```bash
rm -rf node_modules package-lock.json
npm install
```

#### B. Change Port
```bash
# Use different port
PORT=3001 npm start
```

#### C. Check Node Version
```bash
node --version
# Should be 14 or higher
```

### 2. Build Issues

**Symptoms:**
- `npm run build` fails
- Build errors in console
- Missing dependencies

**Solutions:**

#### A. Install Missing Dependencies
```bash
npm install
```

#### B. Clear Build Cache
```bash
rm -rf build
npm run build
```

#### C. Check for Syntax Errors
- Look for JavaScript syntax errors
- Check for missing imports
- Verify component structure

## 🐛 Debugging Tips

### 1. Browser Console
- Press F12 to open developer tools
- Check Console tab for errors
- Check Network tab for API calls

### 2. React Developer Tools
- Install React Developer Tools extension
- Inspect component state and props
- Check component hierarchy

### 3. API Testing
```bash
# Test API endpoints
curl http://127.0.0.1:8000/api/sweets/
curl http://127.0.0.1:8000/api/categories/
```

### 4. Database Inspection
```bash
# Check database content
python manage.py shell
```
```python
from api.models import Sweet
Sweet.objects.all()
```

## 📞 Getting Help

If you're still having issues:

1. **Check the logs:**
   - Browser console (F12)
   - Backend terminal output
   - Django logs

2. **Verify setup:**
   - Both frontend and backend are running
   - Database migrations are applied
   - All dependencies are installed

3. **Test step by step:**
   - Start with a simple API call
   - Add complexity gradually
   - Test each feature individually

4. **Common fixes:**
   - Restart both servers
   - Clear browser cache
   - Reinstall dependencies

---

**Remember:** The app includes fallback data, so even if the API fails, you should see sample sweets displayed! 🍬 