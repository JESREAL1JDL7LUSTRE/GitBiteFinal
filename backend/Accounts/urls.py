from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Accounts.views import CustomerViewSet
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomerTokenObtainView

router = DefaultRouter()
router.register(r'register', CustomerViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomerTokenObtainView.as_view(), name='get_token'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh_token'),
]
