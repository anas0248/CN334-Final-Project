from django.test import TestCase
from product_management.models import Category, Product

class ProductModelTest(TestCase):

    def setUp(self):
        self.category = Category.objects.create(name="Electronics", description="Electronic items")

    def test_create_category(self):
        """Should create a category successfully"""
        self.assertEqual(self.category.name, "Electronics")
        self.assertEqual(str(self.category), "Electronics")

    def test_create_product(self):
        """Should create a product with all fields correctly"""
        product = Product.objects.create(
            name="Smartphone",
            description="Latest model",
            price=999.99,
            stock_quantity=50,
            category=self.category,
            is_active=True,
        )
        self.assertEqual(product.name, "Smartphone")
        self.assertEqual(product.price, 999.99)
        self.assertEqual(product.stock_quantity, 50)
        self.assertTrue(product.is_active)
        self.assertEqual(product.category.name, "Electronics")
        self.assertEqual(str(product), "Smartphone")

    def test_product_str_method(self):
        """__str__ should return product name"""
        product = Product.objects.create(
            name="Tablet",
            description="A good tablet",
            price=499.99,
            stock_quantity=20,
            category=self.category
        )
        self.assertEqual(str(product), "Tablet")
