from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views.registration import UserRegistrationView, UserLoginView, UserDetailView



urlpatterns = [
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register', UserRegistrationView.as_view(), name='register'),
    path('login', UserLoginView.as_view(), name='login'),
    path('me', UserDetailView.as_view(), name='user_detail'),
]