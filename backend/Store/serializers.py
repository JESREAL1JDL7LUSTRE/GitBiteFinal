from rest_framework import serializers
from .models import *

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")

class DishSerializers(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ("id", "name", "description", "recipes", "price", "image", "category", "available")

class OrderSerializers(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        extra_kwargs = {
            "customer": {"read_only": True},
            "status": {"read_only": True},
            "total_price": {"read_only": True},
        }

class OrderedItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderedItem
        fields = "__all__"
        extra_kwargs = {"subtotal": {"read_only": True}}

class CartSerializers(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"
        extra_kwargs = {
            "customer": {"read_only": True},
            "quantity": {"min_value": 1},  # Ensures quantity is at least 1
        }

class PaymentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"
        extra_kwargs = {
            "order": {"read_only": True},
            "customer": {"read_only": True},
            "amount": {"read_only": True},
            "payment_status": {"read_only": True},
            "transaction_id": {"read_only": True},
        }
