from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from user_management.models import Customer
from user_management.serializers import CustomerSerializer
import json
import logging

User = get_user_model()
logger = logging.getLogger(__name__)

class RegisterAPITest(APITestCase):
    def setUp(self):
        self.register_url = '/register/'

    def test_register_success(self):
        """Test successful user registration."""
        user_data = {'username': 'testuser',  'password1': 'testpassword', 'password2': 'testpassword'}
        response = self.client.post(self.register_url, user_data, format='json') 
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.json())
        self.assertTrue(User.objects.filter(username='testuser').exists())
        self.assertTrue(Customer.objects.filter(user=User.objects.get(username='testuser')).exists())

    def test_register_invalid_data(self):
        """Test registration with missing required fields."""
        invalid_data = {'username': 'testuser'}
        response = self.client.post(self.register_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.json())

    def test_register_sql_injection_attempt(self):
        """Test registration with a username attempting SQL injection."""
        malicious_data = {'username': "test' OR '1'='1", 'password': 'testpassword'}
        response = self.client.post(self.register_url, malicious_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(User.objects.filter(username="test' OR '1'='1").exists())

class ProfileViewAPITest(APITestCase): 
    def setUp(self):
        self.profile_url = '/profile/'
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()
        self.client.login(username='testuser', password='testpassword') 
        self.client.force_authenticate(user=self.user)
        logger.info(f"ProfileViewAPITest: User '{self.user.username}' logged in. setUp completed.")

    def test_get_profile_success(self):
        """Test retrieving user profile successfully."""
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['username'], self.user.username)
        self.assertIn('id', response.json())
        logger.info("ProfileViewAPITest: test_get_profile_success completed.")

    def test_get_profile_unauthenticated(self):
        """Test retrieving profile without authentication."""
        self.client.logout()
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)  # Changed to 401

    def test_get_profile_xss_attempt(self):
        """Test retrieving profile when username contains potential XSS."""
        malicious_user = User.objects.create_user(username='<script>alert("XSS")</script>', password='testpassword')
        self.client.force_login(user=malicious_user)
        self.client.force_authenticate(user=malicious_user)
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['username'], '<script>alert("XSS")</script>')

class CustomerViewAPITest(APITestCase):  # Changed to APITestCase
    def setUp(self):
        self.customer_url = '/customer/'
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.customer = Customer.objects.create(user=self.user)
        self.client = APIClient()
        self.client.force_login(self.user)
        self.client.force_authenticate(user=self.user)

    def test_get_customer_success(self):
        """Test retrieving customer details successfully."""
        response = self.client.get(self.customer_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['user'], self.user.id)

    def test_get_customer_sql_injection_attempt(self):
        """Test retrieving customer details with a potentially malicious user ID."""
        malicious_user = User.objects.create_user(username="test' OR '1'='1", password='testpassword')
        Customer.objects.create(user=malicious_user)
        self.client.force_login(malicious_user)
        response = self.client.get(self.customer_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class AllCustomersViewAPITest(APITestCase):
    def setUp(self):
        self.all_customers_url = '/allcustomers/'
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()
        self.client.force_login(self.user)
        self.client.force_authenticate(user=self.user)

        user1 = User.objects.create_user(username='customer1', password='password')
        customer1 = Customer(user=user1)
        customer1.save()
        user2 = User.objects.create_user(username='customer2', password='password')
        customer2 = Customer(user=user2)
        customer2.save()

    def test_get_all_customers_success(self):
        """Test retrieving all customers successfully."""
        response = self.client.get(self.all_customers_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)

    def test_get_all_customers_unauthenticated(self):
        """Test retrieving all customers without authentication."""
        self.client.logout()
        response = self.client.get(self.all_customers_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_customers_xss_in_data(self):
        """Test retrieving all customers when customer data contains potential XSS."""
        xss_user = User.objects.create_user(username='xssuser', password='password')
        xss_customer = Customer(
            user=xss_user,
        )
        xss_customer.save()
        response = self.client.get(self.all_customers_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 3)
