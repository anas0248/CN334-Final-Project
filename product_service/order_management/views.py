from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from order_management.models import *
from order_management.serializers import *

class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        items_data = data.pop('items', [])
        data['user'] = request.user.id
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            order = serializer.save()
            for item in items_data:
                item['order'] = order.id
                item_serializer = OrderItemSerializer(data=item)
                if item_serializer.is_valid():
                    item_serializer.save()
            return Response({"message": "Order created successfully"}, status=201)
        return Response(serializer.errors, status=400)

class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
