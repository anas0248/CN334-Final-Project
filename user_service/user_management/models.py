from django.db import models
from django.contrib.auth.models import User
    
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(blank=True)
    province = models.CharField(max_length=100, blank=True)
    post_code = models.CharField(max_length=5, blank=True)
    phone_number  = models.CharField(max_length=20, blank=True)
