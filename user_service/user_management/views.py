from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from user_management.models import User
from user_management.serializers import *
from django.contrib.auth import get_user_model

User = get_user_model()

@csrf_exempt
def register(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        try:
            new_user = User.objects.create_user(
                username=data['username'],
                password=data['password'],
                email=data.get('email', ''),
                role=data.get('role', 'buyer'),
                phone_number=data.get('phone_number', ''),
                address=data.get('address', '')
            )
        except:
            return JsonResponse({"error": "Username already used."}, status=400)
        return JsonResponse({"message": "User created successfully"}, status=201)
    return JsonResponse({"error": "Method not allowed"}, status=405)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CustomerSerializer(request.user)
        return Response(serializer.data)
