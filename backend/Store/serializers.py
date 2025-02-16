from rest_framework import serializers
from .models import *

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")

class DishSerializers(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()  # Ensures full URL

    def get_image(self, obj):
        request = self.context.get('request')  # Get the request object
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

    class Meta:
        model = Dish
        fields = ("id", "name", "description", "recipes", "price", "image", "category", "available")

class OrderedItemSerializers(serializers.ModelSerializer):
    dish_name = serializers.CharField(source="dish.name", read_only=True)  # ✅ Include dish name

    class Meta:
        model = OrderedItem
        fields = ["id", "dish_name", "quantity", "subtotal"]  # ✅ Only relevant fields
        extra_kwargs = {"subtotal": {"read_only": True}}

class OrderSerializers(serializers.ModelSerializer):
    ordered_items = OrderedItemSerializers(many=True, read_only=True)  # ✅ Include related items

    class Meta:
        model = Order
        fields = ["id", "customer", "total_price", "status", "created_at", "updated_at", "ordered_items"]  # ✅ Include ordered_items
        extra_kwargs = {
            "customer": {"read_only": True},
            "status": {"read_only": True},
            "total_price": {"read_only": True},
        }

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
        fields = "__all__"  # Ensure all fields are included

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["order"] = instance.order.id  # Ensure order ID is included
        data["payment_method"] = instance.payment_method  # Ensure method is included
        data["transaction_id"] = instance.transaction_id  # Ensure transaction ID is included
        if data.get("amount") is None:  
            data["amount"] = 0.0  # Ensure amount is always valid
        return data

