from rest_framework import viewsets
from .models import Customer
from .serializers import CustomerSerializer, CustomerTokenObtainSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenViewBase

class CustomerViewSet(viewsets.ModelViewSet):  # Use ModelViewSet
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]


class CustomerTokenObtainView(TokenViewBase):
    serializer_class = CustomerTokenObtainSerializer