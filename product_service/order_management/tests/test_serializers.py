from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework import serializers
from order_management.serializers import OrderSerializer, OrderItemSerializer, OrderItemWriteSerializer, PaymentSerializer, ShippingSerializer
from order_management.models import Order, OrderItem, Payment, Shipping
from product_management.models import Product
from django.contrib.auth.models import User
from decimal import Decimal
from django.utils import timezone

class OrderSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.product1 = Product.objects.create(name='Product 1', price=Decimal('10.00'), stock_quantity=10)
        self.product2 = Product.objects.create(name='Product 2', price=Decimal('20.00'), stock_quantity=20)
        self.factory = APIRequestFactory()

    def test_order_item_serializer_valid(self):
        order = Order.objects.create(customer=self.user, total_price=Decimal('30.00'), shipping_address='Test Address', payment_method='Test Payment')
        order_item = OrderItem.objects.create(order=order, product=self.product1, quantity=2, price_at_order_time=self.product1.price)
        serializer = OrderItemSerializer(instance=order_item)
        self.assertEqual(serializer.data['product'], self.product1.id)
        self.assertEqual(serializer.data['quantity'], 2)
        self.assertEqual(serializer.data['price_at_order_time'], '10.00')

    def test_order_item_write_serializer_valid(self):
        data = {'product': self.product1.id, 'quantity': 3}
        serializer = OrderItemWriteSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['product'], self.product1)
        self.assertEqual(serializer.validated_data['quantity'], 3)

    def test_order_serializer_create_valid(self):
        data = {
            'shipping_address': '123 Main St',
            'payment_method': 'Credit Card',
            'total_price': Decimal('50.00'),
            'items': [
                {'product': self.product1.id, 'quantity': 1},
                {'product': self.product2.id, 'quantity': 2},
            ],
        }
        request = self.factory.post('/', data)
        request.user = self.user
        serializer = OrderSerializer(data=data, context={'request': request})

        self.assertTrue(serializer.is_valid(), serializer.errors)
        order = serializer.save()

        self.assertEqual(order.customer, self.user)
        self.assertEqual(order.shipping_address, '123 Main St')
        self.assertEqual(order.payment_method, 'Credit Card')
        self.assertEqual(order.items.count(), 2)

        item1 = order.items.first()
        self.assertEqual(item1.product, self.product1)
        self.assertEqual(item1.quantity, 1)
        self.assertEqual(item1.price_at_order_time, self.product1.price)

        item2 = order.items.last()
        self.assertEqual(item2.product, self.product2)
        self.assertEqual(item2.quantity, 2)
        self.assertEqual(item2.price_at_order_time, self.product2.price)
        self.assertEqual(order.total_price, Decimal('50.00'))

    def test_payment_serializer_valid(self):
        order = Order.objects.create(customer=self.user, total_price=Decimal('100.00'), shipping_address='Test Address', payment_method='Test Payment')
        payment = Payment.objects.create(order=order, payment_status='paid', payment_date=timezone.now(), transaction_reference='TXN123')
        serializer = PaymentSerializer(instance=payment)
        self.assertEqual(serializer.data['order'], order.id)
        self.assertEqual(serializer.data['payment_status'], 'paid')
        self.assertEqual(serializer.data['transaction_reference'], 'TXN123')

    def test_shipping_serializer_valid(self):
        order = Order.objects.create(customer=self.user, total_price=Decimal('100.00'), shipping_address='Test Address', payment_method='Test Payment')
        shipping = Shipping.objects.create(order=order, tracking_number='TRACK123', courier_name='Test Courier', shipped_date=timezone.now(), delivery_date=timezone.now(), status='shipped')
        serializer = ShippingSerializer(instance=shipping)
        self.assertEqual(serializer.data['order'], order.id)
        self.assertEqual(serializer.data['tracking_number'], 'TRACK123')
        self.assertEqual(serializer.data['courier_name'], 'Test Courier')
        self.assertEqual(serializer.data['status'], 'shipped')
