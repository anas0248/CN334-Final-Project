from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from order_management.models import OrderItem,Order
from product_management.models import Product
from .serializers import OrderSerializer

# Create your views here.

class OrderByProductIdView(APIView):
    def get(self, request, product_id):
        order_items = OrderItem.objects.filter(product_id=product_id)
        
        orders = [item.order for item in order_items]
        
        if not orders:
            return Response(
                {"message": "No orders found for this product."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SummaryView(APIView):
    def get(self, request):
        total_products = Product.objects.count()
        total_orders = Order.objects.count()

        summary_data = {
            "total_products": total_products,
            "total_orders": total_orders,
        }

        return Response(summary_data, status=status.HTTP_200_OK)