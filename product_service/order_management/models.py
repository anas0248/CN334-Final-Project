from django.db import models
from django.contrib.auth.models import User
from .models import Product,Shipping, Payment

# Create your models here.
class Order(models.Model):
    total_price = models.FloatField()
    status = models.CharField(max_length=50)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    shipping = models.ForeignKey(Shipping, on_delete=models.SET_NULL, null=True)
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, null=True)
    
class ProductOrder(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    total_price = models.FloatField()
    quantity = models.IntegerField()
