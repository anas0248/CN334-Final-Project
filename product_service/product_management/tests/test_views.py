from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.contrib.auth import get_user_model
from product_management.models import Product

User = get_user_model()

class ProductListViewTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.client = APIClient()
        self.url = "/products/"

        Product.objects.create(name="Product 1", price=100, is_active=True, description="Test product 1",
                               stock_quantity=10, category=None)
        Product.objects.create(name="Product 2", price=200, is_active=False, description="Test product 2",
                               stock_quantity=5, category=None)
        
    def test_get_active_products(self):
        """Should return only active products"""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Product 1")

    def test_response_structure(self):
        """Should contain expected product fields"""
        response = self.client.get(self.url)
        product = response.data[0]
        self.assertIn('name', product)
        self.assertIn('price', product)
