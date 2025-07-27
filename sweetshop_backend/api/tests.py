from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User
from django.contrib.auth.hashers import make_password

# SIMPLE TESTS - Easy to understand examples

class SimpleUserTest(TestCase):
    """Simple tests for User model - Basic examples"""
    
    def test_create_user(self):
        """Test 1: Can we create a user?"""
        # Create a user
        user = User.objects.create(
            name='John Doe',
            email='john@example.com',
            password_hash=make_password('password123'),
            role='customer'
        )
        
        # Check if user was created correctly
        self.assertEqual(user.name, 'John Doe')
        self.assertEqual(user.email, 'john@example.com')
        self.assertEqual(user.role, 'customer')
    
    def test_user_password(self):
        """Test 2: Does password checking work?"""
        # Create user with password
        user = User.objects.create(
            name='Jane Doe',
            email='jane@example.com',
            password_hash=make_password('secret123'),
            role='customer'
        )
        
        # Test correct password
        self.assertTrue(user.check_password('secret123'))
        
        # Test wrong password
        self.assertFalse(user.check_password('wrongpassword'))
    
    def test_user_string(self):
        """Test 3: Does the user display correctly?"""
        user = User.objects.create(
            name='Bob Smith',
            email='bob@example.com',
            password_hash=make_password('password123'),
            role='customer'
        )
        
        # Check if user shows email when printed
        self.assertEqual(str(user), 'bob@example.com')

class SimpleAPITest(APITestCase):
    """Simple tests for API endpoints - Basic examples"""
    
    def test_register_user(self):
        """Test 4: Can we register a new user?"""
        # Data to send
        user_data = {
            'name': 'New User',
            'email': 'newuser@example.com',
            'password': 'password123'
        }
        
        # Send POST request to register
        response = self.client.post('/api/auth/register/', user_data, format='json')
        
        # Check if request was successful
        self.assertEqual(response.status_code, 200)
        
        # Check if we got back user data
        self.assertIn('user', response.data)
        self.assertIn('access', response.data)
    
    def test_login_user(self):
        """Test 5: Can we login with correct password?"""
        # First create a user
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
        
        # Check if login worked
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
    
    def test_login_wrong_password(self):
        """Test 6: Does login fail with wrong password?"""
        # Create a user
        User.objects.create(
            name='Test User',
            email='test@example.com',
            password_hash=make_password('correctpassword'),
            role='customer'
        )
        
        # Try to login with wrong password
        login_data = {
            'email': 'test@example.com',
            'password': 'wrongpassword'
        }
        
        response = self.client.post('/api/auth/login/', login_data, format='json')
        
        # Should fail (401 or 404)
        self.assertNotEqual(response.status_code, 200)
    
    def test_profile_without_token(self):
        """Test 7: Can we access profile without login?"""
        # Try to get profile without being logged in
        response = self.client.get('/api/auth/profile/')
        
        # Should be blocked (401)
        self.assertEqual(response.status_code, 401)

# EXPLANATION OF TESTING CONCEPTS:

"""
WHAT IS TESTING?
- Testing is like checking if your code works correctly
- We write small programs that test our main program
- If tests pass = code works, If tests fail = code has problems

BASIC TESTING TERMS:
1. Test Case: A single test that checks one thing
2. Assertion: A check that must be true for test to pass
3. setUp(): Code that runs before each test
4. Test Class: A group of related tests

COMMON ASSERTIONS:
- self.assertEqual(a, b)     # Check if a equals b
- self.assertTrue(x)          # Check if x is True
- self.assertFalse(x)         # Check if x is False
- self.assertIn(item, list)   # Check if item is in list

HTTP STATUS CODES:
- 200: Success (OK)
- 400: Bad Request (wrong data)
- 401: Unauthorized (not logged in)
- 404: Not Found (doesn't exist)

HOW TO RUN TESTS:
python manage.py test api.tests

WHAT EACH TEST DOES:
Test 1: Checks if we can create users in database
Test 2: Checks if password checking works
Test 3: Checks if user displays correctly
Test 4: Checks if registration API works
Test 5: Checks if login API works with correct password
Test 6: Checks if login fails with wrong password
Test 7: Checks if profile is protected (needs login)

WHY TESTING IS IMPORTANT:
1. Catches bugs before users find them
2. Makes sure code works after changes
3. Documents how code should work
4. Gives confidence when making changes
"""


# Basic Testing Concepts:
# What assertions do
# How to check if something works
# HTTP status codes (200=success, 401=unauthorized)


# API Testing:
# How to send requests to your API
# How to check responses
# How to test authentication



# Real-World Scenarios:
# User registration
# User login
# Password verification
# Protected routes
# These tests are much easier to understand and will
#  help you learn testing step by step! Each test focuses on one simple concept, making it perfect for learning.