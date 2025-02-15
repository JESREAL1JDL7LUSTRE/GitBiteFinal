from rest_framework import viewsets, status, permissions, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import Customer
from .serializers import CustomerSerializer, CustomerTokenObtainSerializer
from rest_framework_simplejwt.views import TokenViewBase

User = get_user_model()

# Customer ViewSet
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    
    def get_permissions(self):
        """Set permissions based on action"""
        if self.action == "create":  # Allow sign-up
            return [AllowAny()]
        return [IsAuthenticated()]  # Require authentication for other actions
    
# Custom Token Obtain View
class CustomerTokenObtainView(TokenViewBase):
    serializer_class = CustomerTokenObtainSerializer


class CustomerProfileView(generics.RetrieveAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
