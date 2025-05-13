from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from decimal import Decimal

from order_management.models import Order, OrderItem, Payment, Shipping
from product_management.models import Product

class OrderModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.product1 = Product.objects.create(name='Test Product 1', price=Decimal('10.00'), stock_quantity=100)  
        self.product2 = Product.objects.create(name='Test Product 2', price=Decimal('20.00'), stock_quantity=50)  

    def test_create_order(self):
        order = Order.objects.create(
            customer=self.user,
            total_price=Decimal('30.00'),
            shipping_address='123 Test Address',
            payment_method='Credit Card'
        )
        self.assertEqual(order.customer, self.user)
        self.assertEqual(order.status, 'pending')
        self.assertEqual(order.total_price, Decimal('30.00'))
        self.assertIsNotNone(order.order_date)
        self.assertEqual(str(order), f"Order #{order.id} by testuser")

    def test_add_order_items(self):
        order = Order.objects.create(
            customer=self.user,
            total_price=Decimal('30.00'),
            shipping_address='123 Test Address',
            payment_method='Credit Card'
        )
        OrderItem.objects.create(order=order, product=self.product1, quantity=2, price_at_order_time=self.product1.price)
        OrderItem.objects.create(order=order, product=self.product2, quantity=1, price_at_order_time=self.product2.price)
        self.assertEqual(order.items.count(), 2)
        item1 = order.items.first()
        self.assertEqual(item1.product, self.product1)
        self.assertEqual(item1.quantity, 2)
        self.assertEqual(item1.price_at_order_time, Decimal('10.00'))

    def test_order_status_choices(self):
        order = Order.objects.create(
            customer=self.user,
            total_price=Decimal('10.00'),
            shipping_address='Test',
            payment_method='Test'
        )
        self.assertIn(order.status, ['pending', 'paid', 'shipped', 'completed', 'cancelled'])
        order.status = 'paid'
        order.save()
        self.assertEqual(order.status, 'paid')

class PaymentModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.order = Order.objects.create(
            customer=self.user,
            total_price=Decimal('50.00'),
            shipping_address='456 Another Address',
            payment_method='PayPal'
        )

    def test_create_payment(self):
        payment = Payment.objects.create(order=self.order, payment_status='paid', payment_date=timezone.now(), transaction_reference='TXN123')
        self.assertEqual(payment.order, self.order)
        self.assertEqual(payment.payment_status, 'paid')
        self.assertIsNotNone(payment.payment_date)
        self.assertEqual(payment.transaction_reference, 'TXN123')

    def test_payment_status_choices(self):
        payment = Payment.objects.create(order=self.order, payment_status='pending')
        self.assertIn(payment.payment_status, ['pending', 'paid', 'failed'])
        payment.payment_status = 'failed'
        payment.save()
        self.assertEqual(payment.payment_status, 'failed')

class ShippingModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.order = Order.objects.create(
            customer=self.user,
            total_price=Decimal('75.00'),
            shipping_address='789 Yet Another Address',
            payment_method='Bank Transfer'
        )

    def test_create_shipping(self):
        shipping = Shipping.objects.create(order=self.order, tracking_number='TRACK456', courier_name='DHL', shipped_date=timezone.now(), delivery_date=timezone.now() + timezone.timedelta(days=3), status='In Transit')
        self.assertEqual(shipping.order, self.order)
        self.assertEqual(shipping.tracking_number, 'TRACK456')
        self.assertEqual(shipping.courier_name, 'DHL')
        self.assertIsNotNone(shipping.shipped_date)
        self.assertIsNotNone(shipping.delivery_date)
        self.assertEqual(shipping.status, 'In Transit')

    def test_shipping_fields_can_be_blank(self):
        shipping = Shipping.objects.create(order=self.order)
        self.assertEqual(shipping.tracking_number, '')
        self.assertEqual(shipping.courier_name, '')
        self.assertIsNone(shipping.shipped_date)
        self.assertIsNone(shipping.delivery_date)
        self.assertEqual(shipping.status, '')