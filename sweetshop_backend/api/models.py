from django.db import models
import uuid
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.
class User(models.Model):
    ROLE_CHOICES = (
    ('admin','Admin'),
    ('customer','Customer'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=256)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    
    def set_password(self, password):
        self.password_hash = make_password(password)
    
    def check_password(self, password):
        return check_password(password, self.password_hash)


class Sweet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)  # e.g., 'Chocolate', 'Traditional'
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField(default=0)
    description = models.TextField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)  # Optional image
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - ₹{self.price}"
