from rest_framework import serializers
from .models import *

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")

class DishSerializers(serializers.ModelSerializer):
    # If category is a ManyToManyField or ForeignKey, serialize it properly
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Dish
        fields = ["id", "name", "description", "recipes", "category_name", "available", "image", "price", "created_at", "updated_at", "featured"]
        extra_kwargs = {"image": {"required": False}}
        
    def get_category_name(self, obj):
        # If category is ManyToManyField, this returns all related categories as a list of names
        if obj.category.exists():  # For ManyToManyField
            return [cat.name for cat in obj.category.all()]
        return obj.category.name  # For ForeignKey

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
    dish = serializers.PrimaryKeyRelatedField(
        queryset=Dish.objects.all(),  # Ensure this allows valid dish objects
        write_only=True  # Accepts input but not returned in response
    )
    dish_data = serializers.SerializerMethodField()  # Rename existing `dish` field

    class Meta:
        model = Cart
        fields = ["id", "quantity", "dish", "dish_data"]  # Include both fields

    def get_dish_data(self, obj):  # Renamed to avoid conflict
        request = self.context.get("request")
        image_url = obj.dish.image if obj.dish.image else None

        if image_url and request:
            image_url = request.build_absolute_uri(image_url)

        category_name = obj.dish.category.first().name if obj.dish.category.exists() else None

        return {
            "id": obj.dish.id,
            "name": obj.dish.name,
            "description": obj.dish.description,
            "recipes": obj.dish.recipes,
            "category": category_name,
            "available": obj.dish.available,
            "image": image_url,
        }



class PaymentSerializers(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(
        queryset=Order.objects.all(),
        required=True
    )
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), required=False)

    class Meta:
        model = Payment
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["order"] = instance.order.id
        data["payment_method"] = instance.payment_method
        data["transaction_id"] = instance.transaction_id
        data["amount"] = instance.amount
        return data

    def create(self, validated_data):
        order = validated_data.get("order")
        # Automatically set amount from order's total_price
        validated_data["amount"] = order.total_price

        # Ensure the customer is set correctly here
        validated_data["customer"] = validated_data.get("customer", self.context["request"].user)
        
        transaction_id = uuid.uuid4().hex  # Ensures a new unique ID for each transaction
        validated_data["transaction_id"] = transaction_id
        return super().create(validated_data)

class ReviewSerializers(serializers.ModelSerializer):
    customer_email = serializers.SerializerMethodField()

    class Meta:
        model = Reviews
        fields = ['id', 'dish', 'customer', 'rating', 'review', 'created_at', 'updated_at', 'customer_email']

    def get_customer_email(self, obj):
        return obj.customer.email if obj.customer else "N/A"
        
    def create(self, validated_data):
        validated_data["customer"] = self.context["request"].user
        return super().create(validated_data)