from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Customer

class CustomerAdmin(UserAdmin):  
    model = Customer

    # Fields to display in the list view
    list_display = ("email", "username", "first_name", "last_name", "phone_number", "address", "is_active", "is_staff", "image")

    # Fields to search in the admin panel
    search_fields = ("email", "username", "phone_number")

    # Filters available on the right side
    list_filter = ("is_active", "is_staff")

    # Organizing fields in the edit page
    fieldsets = (
        ("Personal Info", {"fields": ("email", "username", "first_name", "last_name", "phone_number", "address", "image")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important Dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        ("Create Customer", {
            "classes": ("wide",),
            "fields": ("email", "username", "first_name", "last_name", "phone_number", "address", "password1", "password2"),
        }),
    )

    ordering = ("email",)

# Register the model with the customized admin panel
admin.site.register(Customer, CustomerAdmin)
