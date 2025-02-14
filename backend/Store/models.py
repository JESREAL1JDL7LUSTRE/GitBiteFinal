from django.db import models
from Accounts.models import Customer
import uuid

# Category Model
class Category(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Dish Model
class Dish(models.Model):
    name = models.CharField(unique=True, max_length=255)
    description = models.TextField(blank=True)
    recipes = models.TextField(null=False)
    price = models.FloatField(null=False)
    image = models.ImageField(upload_to="dishes/")
    category = models.ManyToManyField(Category, related_name="dishes")
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Order Model
ORDER_STATUS = [
    ('Pending', 'Pending'),
    ('Processing', 'Processing'),
    ('Completed', 'Completed'),
    ('Cancelled', 'Cancelled'),
]

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="orders")
    total_price = models.FloatField(default=0.0)  # Sum of all OrderedItem prices
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} for {self.customer.email}"

# Ordered Item Model
class OrderedItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="ordered_items")
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE, related_name="ordered_items")
    quantity = models.PositiveIntegerField(default=1)
    subtotal = models.FloatField()  # quantity * dish.price

    def __str__(self):
        return f"{self.quantity} x {self.dish.name} (Order {self.order.id})"

# Cart Model
class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="carts")
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE, related_name="cart_items")
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"Cart of {self.customer.email} - {self.dish.name} ({self.quantity})"

# Payment Model
PAYMENT_METHODS = [
    ('COD', 'Cash on Delivery'),
    ('Card', 'Card Payment'),
    ('Epay', 'E-Payment'),
]

class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="payments")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="payments")
    amount = models.FloatField(null=False)
    payment_status = models.BooleanField(default=False)  # False = Pending, True = Completed
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHODS, default='COD')
    transaction_id = models.CharField(max_length=20, unique=True, default=uuid.uuid4().hex[:12])  # 12-character unique ID
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.id} - Order {self.order.id} ({self.payment_method})"
