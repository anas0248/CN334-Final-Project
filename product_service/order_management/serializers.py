from rest_framework import serializers
from product_management.serializers import ProductSerializer
from order_management.models import *
from product_management.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price_at_order_time']
        
class OrderItemWriteSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta: 
        model = OrderItem
        fields = ['product', 'quantity']    

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True) 
    items_write = OrderItemWriteSerializer(many=True, write_only=True, source='items')
    customer = serializers.HiddenField(default=serializers.CurrentUserDefault())
    status = serializers.CharField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'full_name', 'order_date', 'status', 'total_price',
                  'shipping_address', 'phone_number', 'payment_method', 'items', 'items_write']

    def create(self, validated_data):
        items_data = validated_data.pop('items_write', [])
        print("Validated Data:", validated_data)
        validated_data.pop('items', None)
        print("Validated Data:", validated_data)
        print("Items Data:", items_data)
        order = Order.objects.create(**validated_data)
    
        # Create OrderItem instances and associate them with the order
        for item_data in items_data:
            OrderItem.objects.create(
                order=order,
                product=item_data['product'],
                quantity=item_data['quantity'],
                price_at_order_time=item_data['product'].price  # Assuming `price` is a field in the Product model
            )
        
        return order

    
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'payment_status', 'payment_date',
                  'transaction_reference']

class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = ['id', 'order', 'tracking_number', 'courier_name',
                  'shipped_date', 'delivery_date', 'status']
        
class CartItemSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_detail', 'quantity']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']