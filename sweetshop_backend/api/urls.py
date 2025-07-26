from django.urls import path
from api import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [ 
    path('user/', views.UserList.as_view()),
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.login, name='login'),
    path('auth/profile/', views.profile, name='profile'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]