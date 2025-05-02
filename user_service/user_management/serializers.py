from rest_framework import serializers
from user_management.models import *

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'address', 'province', 'post_code', 'phone_number']