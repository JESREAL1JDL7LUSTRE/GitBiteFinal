from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('category', CategoryViewSet, basename='category')
router.register('dish', DishViewSet, basename='dish')
router.register('order', OrderListCreateViewset, basename='order-list')
router.register('payment', PaymentListCreateViewset, basename='payment')


urlpatterns = [
    path('', include(router.urls)),
]
