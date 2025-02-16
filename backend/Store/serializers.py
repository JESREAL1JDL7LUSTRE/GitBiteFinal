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

from django.conf import settings

class CartSerializers(serializers.ModelSerializer):
    dish = serializers.PrimaryKeyRelatedField(queryset=Dish.objects.all())

    class Meta:
        model = Cart
        fields = ["id", "quantity", "dish"]

    def get_dish(self, obj):
        request = self.context.get("request")  # Get request context
        image_url = obj.dish.image.url if obj.dish.image else None

        # Convert relative URL to absolute URL
        if image_url and request is not None:
            image_url = request.build_absolute_uri(image_url)

        return {
            "id": obj.dish.id,
            "name": obj.dish.name,
            "description": obj.dish.description,
            "recipes": obj.dish.recipes,
            "category": obj.dish.category.name,
            "available": obj.dish.available,
            "image": image_url,  # Now returns the full image URL
        }

class PaymentSerializers(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(
        queryset=Order.objects.all(),
        required=True
    )

    class Meta:
        model = Payment
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["order"] = instance.order.id
        data["payment_method"] = instance.payment_method
        data["transaction_id"] = instance.transaction_id
        data["amount"] = instance.amount  # Ensure it's included
        return data

    def create(self, validated_data):
        order = validated_data.get("order")

        # Automatically set amount from order's total_price
        validated_data["amount"] = order.total_price

        return super().create(validated_data)


