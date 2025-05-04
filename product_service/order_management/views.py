from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from order_management.models import *
from order_management.serializers import *
from django.db import transaction


class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        # items_data = data.pop('items', [])
        # data['customer'] = request.user.id
        
        serializer = OrderSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Order created successfully"}, status=201)
        return Response(serializer.errors, status=400)

class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # request.user = User.objects.get(id=1)
        orders = Order.objects.filter(customer=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
class EditOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, customer=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)

        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product')
        quantity = int(request.data.get('quantity', 1))

        cart, created = Cart.objects.get_or_create(user=request.user)
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()

        return Response({'message': 'Item added to cart'})


class ClearCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        cart = Cart.objects.filter(user=request.user).first()
        if cart:
            cart.items.all().delete()
            return Response({'message': 'Cart cleared'})
        return Response({'message': 'Cart is empty'}, status=204)

class ConvertCartToOrderView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        cart = Cart.objects.filter(user=request.user).first()
        if not cart or not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)

        shipping_address = request.data.get('shipping_address')
        payment_method = request.data.get('payment_method')

        order_data = {
            'customer': request.user,
            'shipping_address': shipping_address,
            'payment_method': payment_method,
            'total_price': sum(item.product.price * item.quantity for item in cart.items.all()),
        }

        order = Order.objects.create(**order_data)

        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price_at_order_time=cart_item.product.price
            )

        cart.items.all().delete()

        return Response({'message': 'Order created successfully from cart', 'order_id': order.id}, status=201)