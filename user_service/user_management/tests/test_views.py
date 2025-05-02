from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from user_management.models import Customer

User = get_user_model()

class RegisterViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.register_url = "/register/"
    def test_register_success(self):
        data = {
            "username": "user123",
            "password": "securepass123",
            "address": "123 Main St",
            "province": "Bangkok",
            "post_code": "10200",
            "phone_number": "0123456789"
        }
        response = self.client.post(self.register_url, data, content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertIn("user", response.json())

    def test_register_duplicate_username(self):
        User.objects.create_user(username="user123", password="securepass123")
        data = {
            "username": "user123",
            "password": "anotherpass"
        }
        response = self.client.post(self.register_url, data, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"], "Username already used.")

    def test_register_missing_fields(self):
        data = {"username": "u"}
        response = self.client.post(self.register_url, data, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"], "data not valid")


class ProfileViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="user456", password="pass456")
        self.customer = Customer.objects.create(
            user=self.user,
            address="456 Main Rd",
            province="Chiang Mai",
            post_code="50000",
            phone_number="0987654321"
        )
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    def test_profile_authenticated(self):
        response = self.client.get("/profile/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["user"], self.user.id)

    def test_profile_unauthenticated(self):
        self.client.credentials()
        response = self.client.get("/profile/")
        self.assertEqual(response.status_code, 401)
