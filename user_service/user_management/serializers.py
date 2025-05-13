from django.contrib.auth.models import User
from rest_framework import serializers
from user_management.models import *

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'address', 'province', 'post_code', 'phone_number']
        
class UserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    is_staff = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 
                  'first_name', 'last_name', 
                  'full_name', 'is_staff']

    def get_full_name(self, obj):
        return obj.get_full_name()
    
    def get_is_staff(self, obj):
        return obj.is_staff