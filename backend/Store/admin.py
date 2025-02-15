from django.contrib import admin
from .models import Dish, Order, OrderedItem, Payment, Category, Cart

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Dish._meta.fields]  # Shows all fields

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Order._meta.fields]

@admin.register(OrderedItem)
class OrderedItemAdmin(admin.ModelAdmin):
    list_display = [field.name for field in OrderedItem._meta.fields]

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Payment._meta.fields]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Category._meta.fields]

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Cart._meta.fields]
