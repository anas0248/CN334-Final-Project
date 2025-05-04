from django.contrib import admin
from order_management.models import *

admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)
admin.site.register(Shipping)
admin.site.register(Cart)
admin.site.register(CartItem)

# Register your models here.
