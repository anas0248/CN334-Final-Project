from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from order_management.models import *
from order_management.serializers import *

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
