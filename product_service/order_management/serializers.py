from rest_framework import serializers
from rest_framework.validators import ValidationError
from django.core.validators import RegexValidator
from product_management.serializers import ProductSerializer
from order_management.models import *
from product_management.models import Product

class OrderItemWriteSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    quantity = serializers.IntegerField(min_value=1)

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']
        

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price_at_order_time']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    items_write = OrderItemWriteSerializer(many=True, write_only=True, source='items', )
    customer = serializers.HiddenField(default=serializers.CurrentUserDefault())
    status = serializers.CharField(read_only=True)
    shipping_address = serializers.CharField(
        max_length=255,
        validators=[
            RegexValidator(
                r"^[a-zA-Z0-9\s.,#-]+$",
                message="Invalid characters in shipping address.  Allowed characters are: a-zA-Z0-9 .,#-",
            ),
        ],
    )
    phone_number = serializers.CharField(
        max_length=20,
        validators=[
            RegexValidator(
                r"^\d{10}$",
                message="Phone number must be a 10-digit number.",
            ),
        ],
    )
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'customer', 'full_name', 'order_date', 'status', 'total_price',
                  'shipping_address', 'phone_number', 'payment_method', 'items', 'items_write']

    def validate(self, data):
        """
        Validate the entire order.  Calculates total_price.
        """
        items_write_data = data.get('items', [])
        if not items_write_data:
            raise ValidationError("An order must have at least one item.")
        
        total_price = 0
        for item_data in items_write_data:
            product = item_data['product']
            quantity = item_data['quantity']
            total_price += product.price * quantity
        data['total_price'] = total_price
        print("ANAS",data)
        return data

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        order = Order.objects.create(**validated_data)
        order_items = []
        for item_data in items_data:
            order_item = OrderItem(
                order=order,
                product=item_data['product'],
                quantity=item_data['quantity'],
                price_at_order_time=item_data['product'].price,
            )
            order_items.append(order_item)
        OrderItem.objects.bulk_create(order_items)
        return order
    
    def update(self, instance, validated_data):
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.shipping_address = validated_data.get('shipping_address', instance.shipping_address)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)

        # If items_write is present in the validated data, process item updates
        if 'items' in validated_data:
            items_data = validated_data.pop('items')
            existing_items = {item.product_id: item for item in instance.items.all()}
            updated_items = []

            for item_data in items_data:
                product = item_data['product']
                quantity = item_data['quantity']

                if product.id in existing_items:
                    order_item = existing_items[product.id]
                    order_item.quantity = quantity
                    order_item.price_at_order_time = product.price
                    order_item.save()
                    updated_items.append(order_item)
                else:
                    order_item = OrderItem.objects.create(
                        order=instance,
                        product=product,
                        quantity=quantity,
                        price_at_order_time=product.price
                    )
                    updated_items.append(order_item)

            items_to_delete = [item for item in existing_items.values() if
                               item.product_id not in [item['product'].id for item in items_data]]
            for item in items_to_delete:
                item.delete()

        # Recalculate total price if items were updated
        if 'items' in validated_data:
            total_price = 0
            for item in instance.items.all():
                total_price += item.product.price * item.quantity
            instance.total_price = total_price

        instance.save()
        return instance


    
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