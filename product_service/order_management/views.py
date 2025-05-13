from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.generics import ListAPIView
from order_management.models import *
from order_management.serializers import *
from django.db import transaction


class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['customer'] = request.user.id

        serializer = OrderSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            order = serializer.save() 
            return Response({"message": "Order created successfully", "order_id": order.id}, status=201)

        return Response(serializer.errors, status=400)
    
class AllUserOrdersView(ListAPIView):
    permission_classes = [IsAdminUser] 
    queryset = Order.objects.prefetch_related('items').all()
    serializer_class = OrderSerializer
    
class MyOrdersView(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        orders = Order.objects.filter(customer=request.user).prefetch_related('items')
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
        product_id = request.data.get('product_id')
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
    
class DeleteItemFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        cart = Cart.objects.filter(user=request.user).first()
        if not cart:
            return Response({'error': 'Cart not found'}, status=404)

        try:
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
            cart_item.delete()
            return Response({'message': 'Item removed from cart'}, status=200)
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found in cart'}, status=404)

class AdjustCartItemQuantityView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, product_id):
        quantity = int(request.data.get('quantity', 1))
        if quantity < 1:
            return Response({'error': 'Quantity must be at least 1'}, status=400)

        cart = Cart.objects.filter(user=request.user).first()
        if not cart:
            return Response({'error': 'Cart not found'}, status=404)

        try:
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
            cart_item.quantity = quantity
            cart_item.save()
            return Response({'message': 'Cart item quantity updated'}, status=200)
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found in cart'}, status=404)

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
    
class MakeShippingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, customer=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)

        shipping_data = request.data.copy()
        shipping_data['order'] = order.id
        serializer = ShippingSerializer(data=shipping_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, customer=request.user)
            shipping = Shipping.objects.get(order=order)
            serializer = ShippingSerializer(shipping)
            return Response(serializer.data, status=201)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)