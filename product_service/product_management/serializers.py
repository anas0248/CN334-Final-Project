from rest_framework import serializers
from product_management.models import Product,Shipping

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'scientific_name', 'description', 'size',
            'plant_type', 'image_url', 'price', 'stock', 'category'
        ]

class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = ['id', 'method', 'fee']
        