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
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import update_last_login


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


class CustomerProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "put", "patch"]

    def get_object(self):
        return self.request.user
    
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not check_password(old_password, user.password):
            return Response({"detail": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        # Update the last login
        update_last_login(None, user)

        return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)
