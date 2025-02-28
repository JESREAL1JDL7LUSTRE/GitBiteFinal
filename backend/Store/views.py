from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets, permissions, mixins, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.db import IntegrityError
from rest_framework.pagination import PageNumberPagination

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def get_payment_methods(request):
    return Response({"payment_methods": PAYMENT_METHODS})

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def get_reviews_by_dish(request, dish_id):
    reviews = Reviews.objects.filter(dish=dish_id)
    serializer = ReviewSerializers(reviews, many=True)
    return Response(serializer.data)

class CustomPagination(PageNumberPagination):
    page_size = 10 
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CategorySerializers
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class DishViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DishSerializers
    permission_classes = [permissions.AllowAny]
    queryset = Dish.objects.all()
    pagination_class = CustomPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'recipes', 'category__name', 'price']

    def get_serializer_context(self):
        return {"request": self.request}  # Pass request context

class OrderListCreateViewset(viewsets.ModelViewSet):
    serializer_class = OrderSerializers
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)

    def create(self, request, *args, **kwargs):
        customer = request.user
        dish_data = request.data.get("dishes", [])

        if not dish_data:
            return Response({"error": "Dish data is required."}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(customer=customer, status="Pending")

        for dish_info in dish_data:
            dish_id = dish_info.get("dish_id")
            quantity = int(dish_info.get("quantity", 1))

            if not dish_id:
                return Response({"error": "Dish ID is required."}, status=status.HTTP_400_BAD_REQUEST)

            try:
                dish = Dish.objects.get(id=dish_id)
            except Dish.DoesNotExist:
                return Response({"error": f"Dish with ID {dish_id} not found."}, status=status.HTTP_404_NOT_FOUND)

            # Handle ordered item creation or update
            ordered_item, item_created = OrderedItem.objects.get_or_create(
                order=order, dish=dish,
                defaults={"quantity": quantity, "subtotal": dish.price * quantity}
            )

            if not item_created:
                ordered_item.quantity += quantity
                ordered_item.subtotal = ordered_item.quantity * dish.price
                ordered_item.save()

        # Update the order's total price
        order.update_total_price()

        return Response(OrderSerializers(order).data, status=status.HTTP_201_CREATED)

    def perform_destroy(self, instance):
        instance.delete()

class PaymentListCreateViewset(viewsets.ModelViewSet):
    serializer_class = PaymentSerializers
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Payment.objects.filter(customer = self.request.user)
    
    def perform_create(self, serializer):
        customer = self.request.user
        print(f"Authenticated user: {customer}") 
        serializer.save(customer=customer)

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializers
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Cart.objects.filter(customer=self.request.user)

    def perform_create(self, serializer):
        customer = self.request.user
        dish = serializer.validated_data["dish"]

        try:
            # Try to get the cart item or create a new one
            cart_item, created = Cart.objects.get_or_create(customer=customer, dish=dish, defaults={"quantity": 1})
            
            if not created:
                # If already exists, increase quantity instead
                cart_item.quantity += 1
                cart_item.save()

            serializer.instance = cart_item
        except IntegrityError:
            # Handle case where duplicate entries might have been created
            existing_cart_item = Cart.objects.filter(customer=customer, dish=dish).first()
            existing_cart_item.quantity += 1
            existing_cart_item.save()
            serializer.instance = existing_cart_item
            
    def update(self, request, *args, **kwargs):
        customer = self.request.user
        cart_item = self.get_object()

        quantity_change = request.data.get("quantityChange", None)

        if quantity_change is None:
            return Response({"error": "quantityChange field is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Update quantity
        cart_item.quantity += int(quantity_change)
        if cart_item.quantity < 1:
            cart_item.quantity = 1  # Prevent negative or zero quantity

        cart_item.save()

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializers
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Reviews.objects.filter(customer=self.request.user)

    def perform_create(self, serializer):
        customer = self.request.user
        serializer.save(customer=customer)