from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=20)
    scientific_name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    size = models.CharField(max_length=50)
    plant_type = models.CharField(max_length=50)
    image_url = models.URLField(max_length=500)
    price = models.FloatField()
    stock = models.IntegerField()
    category = models.CharField(max_length=255)
    
class Shipping(models.Model):
    method = models.CharField(max_length=255)
    fee = models.FloatField()