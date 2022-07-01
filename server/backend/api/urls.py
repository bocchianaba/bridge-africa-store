from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views.registration import UserRegistrationView, UserLoginView, UserDetailView
from .views.product import (
    ProductDetailView, 
    ProductPostLikePushView, 
    ProductPostLikePopView, 
    ProductPostDisLikePushView,
    ProductPostDislikePopView, 
    ProductPostLovePushView, 
    ProductPostLovePopView
)



urlpatterns = [
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register', UserRegistrationView.as_view(), name='register'),
    path('login', UserLoginView.as_view(), name='login'),
    path('me', UserDetailView.as_view(), name='user_detail'),
    path('products', ProductDetailView.as_view(), name='all_products'),
    path('product/<int:pk>', ProductDetailView.as_view(), name='product_detail'),
    path('product/<int:pk>/like', ProductPostLikePushView.as_view(), name='product_like_push'),
    path('product/<int:pk>/like/pop', ProductPostLikePopView.as_view(), name='product_like_pop'),
    path('product/<int:pk>/dislike', ProductPostDisLikePushView.as_view(), name='product_dislike_push'),
    path('product/<int:pk>/dislike/pop', ProductPostDislikePopView.as_view(), name='product_dislike_pop'),
    path('product/<int:pk>/love', ProductPostLovePushView.as_view(), name='product_love_push'),
    path('product/<int:pk>/love/pop', ProductPostLovePopView.as_view(), name='product_love_pop'),
]