from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from product_management.models import Product, Category
from product_management.serializers import ProductSerializer
from django.utils.text import slugify

class ProductAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.category1 = Category.objects.create(name="Electronics")
        self.category2 = Category.objects.create(name="Clothing")

        self.product1 = Product.objects.create(
            name="Laptop",
            description="Powerful laptop for work and play.",
            price=1200.00,
            stock_quantity=10,
            category=self.category1,
            is_active=True,
        )
        self.product2 = Product.objects.create(
            name="T-Shirt",
            description="Comfortable cotton t-shirt.",
            price=25.00,
            stock_quantity=10,
            category=self.category2,
            is_active=True,
        )
        self.product3 = Product.objects.create(
            name="Inactive Product",
            description="This product is inactive.",
            price=100.00,
            stock_quantity=10,
            category=self.category1,
            is_active=False,
        )

    def test_product_list(self):
        url = '/products/'
        response = self.client.get(url)
        print(response) 
        self.assertEqual(response.status_code, 200)

        products = Product.objects.filter(is_active=True)
        expected_data = ProductSerializer(products, many=True).data
        self.assertEqual(response.data, expected_data)

        product_ids = [item['id'] for item in response.data]
        self.assertNotIn(self.product3.id, product_ids)

    def test_product_category_list_normal(self):
        url = '/category/{}/'.format(self.category1.name)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        products = Product.objects.filter(category=self.category1, is_active=True)
        expected_data = ProductSerializer(products, many=True).data
        self.assertEqual(response.data, expected_data)

    def test_product_category_list_invalid_category(self):
        nonexistentcategory = "non-existent-category"
        url = '/category/{}/'.format(nonexistentcategory)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 500) 

    def test_product_category_list_xss_attempt(self):
        url = '/category/{}/'.format("<script>alert('XSS')</script>")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_product_category_list_sql_injection_attempt(self):
        url = '/category/{}/'.format("Electronics' --")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 500)
