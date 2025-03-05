from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *

router = DefaultRouter()
router.register(r'register', CustomerViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomerTokenObtainView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('profile/', CustomerProfileView.as_view(), name='customer-profile'),
    path('changepassword/', ChangePasswordView.as_view(), name="change-password"),
    path("forgot-password/", ResetPasswordDirectlyView.as_view(), name="forgot-password-direct"),
]
