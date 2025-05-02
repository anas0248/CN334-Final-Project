from rest_framework import serializers
from .models import *
        
class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field='name', 
        queryset=Category.objects.all()
    )
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'stock_quantity', 
                  'category', 'is_active']

        