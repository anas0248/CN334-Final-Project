from django.test import TestCase
from django.contrib.auth import get_user_model
from user_management.models import Customer
from user_management.serializers import CustomerSerializer

User = get_user_model()

class CustomerSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')

    def test_valid_customer_data(self):
        """Should serialize and save correctly with valid data"""
        data = {
            'user': self.user.id,
            'address': '123/4 Test Street',
            'province': 'Bangkok',
            'post_code': '10100',
            'phone_number': '0812345678'
        }
        serializer = CustomerSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        customer = serializer.save()
        self.assertEqual(customer.user.username, 'testuser')

    def test_missing_required_field(self):
        """Should return error when required fields are missing"""
        data = {
            'user': self.user.id,
            'province': 'Bangkok',
            'post_code': '10100',
            'phone_number': '0812345678'
        }
        serializer = CustomerSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_invalid_user_id(self):
        """Should return error when user ID is invalid"""
        data = {
            'user': 9999, 
            'address': 'Test',
            'province': 'Test',
            'post_code': '00000',
            'phone_number': '0800000000'
        }
        serializer = CustomerSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('user', serializer.errors)
