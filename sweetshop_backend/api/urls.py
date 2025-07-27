from django.urls import path
from api import views

urlpatterns = [ 
    path('auth/register/', views.register),
    path('auth/login/', views.login),
    path('auth/profile/', views.profile),
    
    # Sweet management endpoints
    path('sweets/', views.sweets_list, name='sweets-list'),
    path('sweets/<uuid:sweet_id>/', views.sweet_detail, name='sweet-detail'),
    path('sweets/create/', views.create_sweet, name='create-sweet'),
    path('sweets/<uuid:sweet_id>/update/', views.update_sweet, name='update-sweet'),
    path('sweets/<uuid:sweet_id>/delete/', views.delete_sweet, name='delete-sweet'),
    path('categories/', views.categories_list, name='categories-list'),
]