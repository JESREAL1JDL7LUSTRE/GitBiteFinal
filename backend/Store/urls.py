from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('category', CategoryViewSet, basename='category')
router.register('dish', DishViewSet, basename='dish')
router.register('order', OrderListCreateViewset, basename='order-list')
router.register('payment', PaymentListCreateViewset, basename='payment')
router.register('cart', CartViewSet, basename='cart')
router.register('reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('', include(router.urls)),
    path('payment-methods/', get_payment_methods, name='payment-methods'),
    path("reviews/dish/<int:dish_id>/", get_reviews_by_dish, name="get_reviews_by_dish"),
]
