from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.hashers import make_password
from cloudinary.models import CloudinaryField

class Customer(AbstractUser):
    password = models.CharField(max_length=10000, null=False)
    email = models.EmailField(unique=True, max_length=225)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, null=True)
    image = CloudinaryField("customers", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Ensure email is used as the unique identifier instead of username
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email
