"""
URL configuration for product_service project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from product_management.views import *
from order_management.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('products/', ProductView.as_view(), name='products'),
    path('products/<product_id>/', ProductDetailView.as_view(), name='product-detail'),
    path('shipping/', ShippingView.as_view(), name='shipping'),
    path('order/byProductId/<product_id>/', OrderByProductIdView.as_view(), name='orders-by-product'),
    path('summarize/', SummaryView.as_view(), name='summary'),
]
