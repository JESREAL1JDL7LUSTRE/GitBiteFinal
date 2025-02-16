from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
# Create your views here.

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CategorySerializers
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()


class DishViewSet(viewsets.ReadOnlyModelViewSet):  # Allows only GET requests
    serializer_class = DishSerializers
    permission_classes = [permissions.AllowAny]
    queryset = Dish.objects.all()

    def get_serializer_context(self):
        return {"request": self.request}  # Pass request context


class OrderListCreateViewset(viewsets.ModelViewSet):
    serializer_class = OrderSerializers
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(customer = self.request.user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(customer = self.request.user)
        else:
            print(serializer.errors)
            
    def perform_destroy(self, instance):
        instance.delete()
    
class PaymentListCreateViewset(viewsets.ModelViewSet):
    serializer_class = PaymentSerializers
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(customer = self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(customer = self.request.user)
            
from django.db import IntegrityError

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializers
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Cart.objects.filter(customer=self.request.user)

    def perform_create(self, serializer):
        customer = self.request.user
        dish = serializer.validated_data['dish']
        quantity = serializer.validated_data.get('quantity', 1)

        # Check if the item is already in the cart
        cart_item, created = Cart.objects.get_or_create(customer=customer, dish=dish)

        if not created:
            # If it exists, update the quantity
            cart_item.quantity += quantity
            cart_item.save()
        else:
            serializer.save(customer=customer)  # Normal save if new item
