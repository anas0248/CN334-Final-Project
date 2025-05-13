from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from user_management.models import *
from user_management.serializers import *
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.http import require_http_methods


User = get_user_model()

@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    try:
        data = JSONParser().parse(request)

        form = UserCreationForm(data)
        if form.is_valid():
            user = form.save()
            customer_data = data.copy()
            customer_data['user'] = user.id
            customer_serializer = CustomerSerializer(data=customer_data)
            if customer_serializer.is_valid():
                customer_serializer.save()
                return JsonResponse(customer_serializer.data, status=201)
            else:
                user.delete()
                return JsonResponse({"error": "Invalid customer data.", "details": customer_serializer.errors}, status=400)
        else:
            return JsonResponse({"error": "Invalid user data.", "details": form.errors}, status=400)

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return JsonResponse({"error": "An unexpected error occurred."}, status=500)

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return JsonResponse({"error": "An unexpected error occurred."}, status=500)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
    
class userprofile_update(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class CustomerView(APIView):
    permission_classes = [IsAuthenticated]    

    def get(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
        except Customer.DoesNotExist:
            return Response({"error": "Customer profile not found."}, status=404)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)
    
class CustomerUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
        except Customer.DoesNotExist:
            return Response({"error": "Customer profile not found."}, status=404)
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class AllCustomersView(ListAPIView):
    permission_classes = [IsAdminUser] 
    queryset = Customer.objects.all() 
    serializer_class = CustomerSerializer
