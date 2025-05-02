from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from product_management.models import Product
from product_management.serializers import ProductSerializer

class ProductList(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(is_active=True)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
