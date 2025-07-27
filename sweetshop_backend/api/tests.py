"""
Simple Tests for Sweet Shop API
Basic test cases for User and Sweet models
"""
from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Sweet
from django.contrib.auth.hashers import make_password


class UserTest(TestCase):
    """Simple tests for User model"""
    
    def test_create_user(self):
        """Test creating a user"""
        user = User.objects.create(
            name='Test User',
            email='test@example.com',
            password_hash=make_password('password123'),
            role='customer'
        )
        
        self.assertEqual(user.name, 'Test User')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.role, 'customer')
    
    def test_user_password(self):
        """Test password checking"""
        user = User.objects.create(
            name='Test User',
            email='test@example.com',
            password_hash=make_password('secret123'),
            role='customer'
        )
        
        # Test correct password
        self.assertTrue(user.check_password('secret123'))
        
        # Test wrong password
        self.assertFalse(user.check_password('wrongpassword'))
    
    def test_user_string(self):
        """Test user string representation"""
        user = User.objects.create(
            name='Test User',
            email='test@example.com',
            password_hash=make_password('password123'),
            role='customer'
        )
        
        self.assertEqual(str(user), 'test@example.com')


class SweetTest(TestCase):
    """Simple tests for Sweet model"""
    
    def test_create_sweet(self):
        """Test creating a sweet"""
        sweet = Sweet.objects.create(
            name='Gulab Jamun',
            category='Traditional',
            price='280.00',
            stock=15,
            unit='kg',
            description='Soft milk dumplings in sugar syrup'
        )
        
        self.assertEqual(sweet.name, 'Gulab Jamun')
        self.assertEqual(sweet.category, 'Traditional')
        self.assertEqual(float(sweet.price), 280.00)
        self.assertEqual(sweet.stock, 15)
    
    def test_sweet_string(self):
        """Test sweet string representation"""
        sweet = Sweet.objects.create(
            name='Gulab Jamun',
            category='Traditional',
            price='280.00',
            stock=15,
            unit='kg'
        )
        
        self.assertEqual(str(sweet), 'Gulab Jamun - ₹280.00')


class APITest(APITestCase):
    """Simple tests for API endpoints"""
    
    def test_register_user(self):
        """Test user registration"""
        user_data = {
            'name': 'New User',
            'email': 'newuser@example.com',
            'password': 'password123'
        }
        
        response = self.client.post('/api/auth/register/', user_data, format='json')
        
        self.assertEqual(response.status_code, 200)
        self.assertIn('user', response.data)
        self.assertIn('access', response.data)
    
    def test_login_user(self):
        """Test user login"""
        # Create a user first
        User.objects.create(
            name='Login User',
            email='login@example.com',
            password_hash=make_password('mypassword'),
            role='customer'
        )
        
        # Try to login
        login_data = {
            'email': 'login@example.com',
            'password': 'mypassword'
        }
        
        response = self.client.post('/api/auth/login/', login_data, format='json')
        
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
    
    def test_get_sweets(self):
        """Test getting sweets list"""
        # Create a test sweet
        Sweet.objects.create(
            name='Test Sweet',
            category='Test Category',
            price='100.00',
            stock=10,
            unit='kg'
        )
        
        response = self.client.get('/api/sweets/')
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Sweet')
    
    def test_profile_requires_auth(self):
        """Test that profile requires authentication"""
        response = self.client.get('/api/auth/profile/')
        
        self.assertEqual(response.status_code, 401)