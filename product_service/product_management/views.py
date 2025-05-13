from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from product_management.models import Product, Category
from product_management.serializers import ProductSerializer
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

def test_cors(request):
    return HttpResponse("CORS Test Successful")

class ProductList(APIView):

    def get(self, request):
        products = Product.objects.filter(is_active=True)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductCategoryList(APIView):
    def get(self, request, category_slug):
        try:
            category = get_object_or_404(Category, name=category_slug)
            products = Product.objects.filter(category=category, is_active=True)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)