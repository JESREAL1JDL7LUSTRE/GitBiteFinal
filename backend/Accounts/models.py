from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Customer(models.Model):
    email = models.EmailField(unique=True, max_length=225)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # Use CharField for phone numbers
    password = models.CharField(max_length=10000, null=True)
    address = models.CharField(max_length=255, null=True)
    last_login = models.DateTimeField(auto_now=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.email
