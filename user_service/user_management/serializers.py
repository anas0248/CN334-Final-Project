from rest_framework import serializers
from user_management.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'address', 'province', 'post_code', 'tel']

class PaymentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='payment_owner.username', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id', 'payment_owner', 'username', 'method',
            'card_no', 'expired', 'holder_name'
        ]