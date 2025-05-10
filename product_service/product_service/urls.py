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
    path('test-cors/', test_cors),
    path('admin/', admin.site.urls),
    path('products/', ProductList.as_view()),
    path('orders/create/', OrderCreateView.as_view()),
    path('allorders/', AllUserOrdersView.as_view()),
    path('orders/my/', MyOrdersView.as_view()),
    path('orders/edit/<int:order_id>/', EditOrderView.as_view()),
    path('category/<category_slug>/', ProductCategoryList.as_view()),
    path("cart/", CartView.as_view()),
    path("cart/add/", AddToCartView.as_view()),
    path("cart/item/<int:product_id>/delete/", DeleteItemFromCartView.as_view()),
    path("cart/item/<int:product_id>/adjust/", AdjustCartItemQuantityView.as_view()),
    path("cart/clear/", ClearCartView.as_view()),
    path("cart/makeorder/", ConvertCartToOrderView.as_view()),
    path("shipping/<int:order_id>/", MakeShippingView.as_view()),
]