from rest_framework import serializers
from product_management.serializers import ProductSerializer
from order_management.models import OrderItem,Order
from product_management.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # แสดงข้อมูลสินค้าแบบละเอียด
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price_at_purchase']
        
class OrderItemWriteSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']
      
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemWriteSerializer(many=True, write_only=True)  # รับข้อมูลสินค้า (เขียน)
    order_items = OrderItemSerializer(many=True, read_only=True, source='items')  # แสดงสินค้า (อ่าน)

    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'order_date', 'total_price', 
            'status', 'shipping_address', 'payment_method', 
            'items', 'order_items'
        ]
        read_only_fields = ['customer', 'order_date', 'total_price', 'status']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        customer = self.context['request'].user  # ตั้งค่า customer จากผู้ใช้ปัจจุบัน
        order = Order.objects.create(customer=customer, **validated_data)

        # สร้างรายการสินค้าในออร์เดอร์
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        # คำนวณราคารวมจากรายการสินค้า
        total = sum(item.price_at_purchase * item.quantity for item in order.items.all())
        order.total_price = total
        order.save()

        return order