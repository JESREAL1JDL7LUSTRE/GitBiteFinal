from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["email", "first_name", "last_name", "username", "phone_number", "password", "address"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)  # Remove password from validated data
        customer = Customer(**validated_data)  # Create Customer instance without password
        if password:
            customer.set_password(password)  # Hash the password before saving
        customer.save()
        return customer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import Customer

class CustomerTokenObtainSerializer(serializers.Serializer):
    """Custom Token Serializer to authenticate Customers using email OR username"""
    
    email_or_username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email_or_username = attrs.get("email_or_username")
        password = attrs.get("password")

        # Try to find customer by email or username
        try:
            customer = Customer.objects.get(email=email_or_username)
        except Customer.DoesNotExist:
            try:
                customer = Customer.objects.get(username=email_or_username)
            except Customer.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")

        # Check password
        if not check_password(password, customer.password):
            raise serializers.ValidationError("Invalid credentials")

        refresh = RefreshToken.for_user(customer)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "email": customer.email,
            "username": customer.username,  # Only included in the response
        }