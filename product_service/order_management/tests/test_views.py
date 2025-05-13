from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from order_management.models import Order, OrderItem, Cart, CartItem, Shipping
from product_management.models import Product 
from order_management.serializers import OrderSerializer, CartSerializer, ShippingSerializer

class OrderCreateViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.order_url = '/orders/create/'
        self.product = Product.objects.create(name='Test Product', price=250.00, stock_quantity=10)

    def test_create_order_normal(self):
        data = {
            "total_price": 500,
            "shipping_address": "123 Main Street",
            "phone_number": "1234567890",
            "payment_method": "COD",
            "items_write": [
                {
                    "product": self.product.id,
                    "quantity": 2
                }
            ]
        }
        response = self.client.post(self.order_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Order created successfully')

    def test_create_order_invalid_input_type(self):
        data = {
            "total_price": "abc",
            "shipping_address": "123 Main Street",
            "phone_number": "1234567890",
            "payment_method": "COD",
            "items_write": [
                {
                    "product": self.product.id,
                    "quantity": 2
                }
            ]
        }
        response = self.client.post(self.order_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_order_sql_injection_shipping_address(self):
        data = {
            "total_price": 500,
            "shipping_address": "'; DELETE FROM order_management_order; --",
            "phone_number": "1234567890",
            "payment_method": "COD",
            "items_write": [
                {
                    "product": self.product.id,
                    "quantity": 2
                }
            ]
        }
        response = self.client.post(self.order_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Order.objects.count(), 0)