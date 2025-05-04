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
    items = OrderItemWriteSerializer(many=True, write_only=True)
    customer = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Order
        fields = ['id', 'customer', 'order_date', 'status', 'total_price',
                  'shipping_address', 'payment_method', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items', None) 
        request = self.context.get('request')
        user = request.user
        order = Order.objects.create(**validated_data)

        if items_data:
            for item in items_data:
                product = item.get('product')
                quantity = item['quantity']
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity,
                    price_at_order_time=product.price
                )
        else:
            # ดึงจาก Cart ถ้าไม่มี items ส่งมา
            from order_management.models import Cart, CartItem
            cart = Cart.objects.filter(user=user).first()
            if not cart or not cart.items.exists():
                raise serializers.ValidationError("Cart is empty")

            for cart_item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    quantity=cart_item.quantity,
                    price_at_order_time=cart_item.product.price
                )
            cart.items.all().delete()

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