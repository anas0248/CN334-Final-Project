from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import *
from .serializers import *
from rest_framework import status
from django.shortcuts import get_object_or_404



class ProductView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response({'data': serializer.data})

    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ProductDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, product_id, format=None):
        product = get_object_or_404(Product, id=product_id)
        serializer = ProductSerializer(product)
        return Response({'data': serializer.data})

class ShippingView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        shipping_methods = Shipping.objects.all()
        serializer = ShippingSerializer(shipping_methods, many=True)
        return Response({'data': serializer.data})

    def post(self, request, format=None):
        serializer = ShippingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
