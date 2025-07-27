from django.urls import path
from api import views

urlpatterns = [ 
    path('auth/register/', views.register),
    path('auth/login/', views.login),
    path('auth/profile/', views.profile),
]