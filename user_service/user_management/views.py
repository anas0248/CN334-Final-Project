from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from user_management.models import *
from user_management.serializers import *
from django.contrib.auth import get_user_model
from django.views.decorators.http import require_http_methods


User = get_user_model()

@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    data = JSONParser().parse(request)

    required_fields = ['username', 'password']
    if not all(field in data for field in required_fields):
        return JsonResponse({"error": "data not valid"}, status=400)

    if User.objects.filter(username=data['username']).exists():
        return JsonResponse({"error": "Username already used."}, status=400)

    new_user = User.objects.create_user(
        username=data['username'],
        password=data['password']
    )

    data['user'] = new_user.id
    customer_serializer = CustomerSerializer(data=data)

    if customer_serializer.is_valid():
        customer_serializer.save()
        return JsonResponse(customer_serializer.data, status=201)

    new_user.delete()
    return JsonResponse({"error": "Invalid customer data", "details": customer_serializer.errors}, status=400)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
    
class CustomerView(APIView):
    permission_classes = [IsAuthenticated]    

    def get(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
        except Customer.DoesNotExist:
            return Response({"error": "Customer profile not found."}, status=404)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)
    
class AllCustomersView(ListAPIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view
    queryset = Customer.objects.all()  # Fetch all customers
    serializer_class = CustomerSerializer

