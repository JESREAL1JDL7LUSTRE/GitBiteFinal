from django.contrib import admin
from .models import Dish, Order, OrderedItem, Payment, Category, Cart
from django import forms

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    filter_horizontal = ('category',)
    list_display = [field.name for field in Dish._meta.fields]  # Shows all fields

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Order._meta.fields]

@admin.register(OrderedItem)
class OrderedItemAdmin(admin.ModelAdmin):
    list_display = [field.name for field in OrderedItem._meta.fields]
    readonly_fields = ["subtotal"]
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Category._meta.fields]

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Cart._meta.fields]
    
    
class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = "__all__"

    def save(self, commit=True):
        instance = super().save(commit=False)  # Get instance without saving
        if instance.order:
            instance.customer = instance.order.customer  # Set customer
            instance.amount = instance.order.total_price  # Set amount

        if commit:
            instance.save()  # Save to DB
        return instance


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    form = PaymentForm
    readonly_fields = ("customer", "amount")  # Make them non-editable
    list_display = [field.name for field in Payment._meta.fields]