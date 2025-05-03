from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from product_management.models import Category, Product
from order_management.models import Order, OrderItem

class OrderViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.category = Category.objects.create(name="Test Category")
        self.product = Product.objects.create(
            name="แจกัน",
            description="แจกันปั้นด้วยมือน้องเตเต้",
            price=299.00,
            stock_quantity=10,
            category=self.category
        )

    def test_create_order(self):
        """Should create an order with order items"""
        order_data = {
            "total_price": 598.00,
            "shipping_address": "123 Handmade Lane",
            "payment_method": "COD",
            "items": [
                {
                    "product": self.product.id,
                    "quantity": 2
                }
            ]
        }

        response = self.client.post("/orders/create/", order_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "Order created successfully")
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(OrderItem.objects.count(), 1)

    def test_get_my_orders(self):
        """Should return list of orders for the authenticated user"""
        order = Order.objects.create(
            customer=self.user,
            total_price=299.00,
            shipping_address="Test Address",
            payment_method="COD"
        )
        OrderItem.objects.create(order=order, product=self.product, quantity=1, price_at_order_time=self.product.price)

        response = self.client.get("/orders/my/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], order.id)

    def test_create_order_unauthenticated(self):
        """Should return 401 if user is not authenticated"""
        self.client.force_authenticate(user=None)
        response = self.client.post("/orders/create/", {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
