from django.test import TestCase
from product_management.models import Category, Product
from product_management.serializers import ProductSerializer

class ProductSerializerTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Books", description="All kinds of books")

    def test_valid_product_data(self):
        """Serializer should be valid with correct product data"""
        product_data = {
            "name": "Harry Potter",
            "description": "A fantasy novel",
            "price": "299.99",
            "stock_quantity": 100,
            "category": "Books",
            "is_active": True
        }
        serializer = ProductSerializer(data=product_data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['name'], "Harry Potter")

    def test_missing_required_fields(self):
        """Serializer should be invalid when required fields are missing"""
        product_data = {}
        serializer = ProductSerializer(data=product_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertIn('price', serializer.errors)
        self.assertIn('category', serializer.errors)

    def test_invalid_category(self):
        """Serializer should be invalid if category name does not exist"""
        product_data = {
            "name": "Fake Product",
            "description": "Invalid category test",
            "price": "100.00",
            "stock_quantity": 5,
            "category": "InvalidCategory",
            "is_active": True
        }
        serializer = ProductSerializer(data=product_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('category', serializer.errors)
