from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from order_management.models import *
from product_management.models import Category, Product

User = get_user_model()

class OrderViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass123")
        self.client = APIClient()
        self.client.login(username="testuser", password="testpass123")

        self.category = Category.objects.create(name="Books")
        self.product = Product.objects.create(
            name="Book A",
            description="A good book",
            price=100.00,
            stock_quantity=50,
            category=self.category,
            is_active=True
        )

    def test_create_order(self):
        """Should create an order with order items"""
        url = "/orders/create/"
        order_data = {
            "shipping_address": "123 Main St",
            "items": [
                {
                    "product": self.product.id,
                    "quantity": 2
                }
            ]
        }
        response = self.client.post(url, order_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(OrderItem.objects.count(), 1)

    def test_get_my_orders(self):
        """Should retrieve orders for the logged-in user"""
        order = Order.objects.create(user=self.user, shipping_address="123")
        OrderItem.objects.create(order=order, product=self.product, quantity=1)

        url = "/orders/my/"  # adjust according to your route
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
