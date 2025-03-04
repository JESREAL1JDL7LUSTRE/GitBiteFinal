from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
Customer = get_user_model()


# Customer Serializer
class CustomerSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    def get_image(self, obj):
        if obj.image:
            return obj.image.url  # This should return the full Cloudinary URL
        return None
    
    class Meta:
        model = Customer
        fields = ["id", "email", "first_name", "last_name", "username", "phone_number", "password", "address", "image", "created_at", "updated_at"]
        extra_kwargs = {
            "password": {"write_only": True},  # Hide password in responses
        }
        
    def create(self, validated_data):
        password = validated_data.pop("password", None)  # Remove password from validated data
        customer = Customer(**validated_data)
        if password:
            customer.set_password(password)  # Hash the password before saving
        customer.save()
        return customer

class CustomerTokenObtainSerializer(serializers.Serializer):
    """Custom Token Serializer to authenticate Customers using email OR username"""
    
    email_or_username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email_or_username = attrs.get("email_or_username")
        password = attrs.get("password")

        # Try to find the user by email first, then by username
        customer = Customer.objects.filter(email=email_or_username).first() or Customer.objects.filter(username=email_or_username).first()

        if customer is None or not check_password(password, customer.password):
            raise serializers.ValidationError("Invalid credentials")

        refresh = RefreshToken.for_user(customer)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "email": customer.email,
            "username": customer.username,
        }