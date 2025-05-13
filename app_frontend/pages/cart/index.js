// pages/basket.js
"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Swal from "sweetalert2";
import Footer from "@/components/Footer";

export default function Basket() {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const productApiUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;

  useEffect(() => {
    const fetchCart = async () => {
      localStorage.removeItem('order_id');
      const token = localStorage.getItem('jwt_access');
      console.log(token);
      try {
        const res = await fetch(`${productApiUrl}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          if (data && data.items && Array.isArray(data.items)) {
            const productList = data.items.map(item => ({
              id: item.product,
              name: item.product_detail.name,
              price: parseFloat(item.product_detail.price),
              quantity: item.quantity,
              image: item.product_detail.image,
            }));
            setProducts(productList);
          } else {
            setProducts([]);
          }
        } else {
          console.error(data);
          if (res.status === 401) {
            Swal.fire({
              title: "Session Expired",
              text: "Your session has expired. Please log in again.",
              icon: "warning",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Failed to fetch cart items.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
          localStorage.removeItem('jwt_access');
          router.push('/login');
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        Swal.fire({
          title: "Error",
          text: "An error occurred while fetching the cart.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const adjustCartItemQuantity = async (productId, quantity) => {
    try {
      const response = await fetch(
        `${productApiUrl}/cart/item/${productId}/adjust/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_access")}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }

      // Update the state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, quantity } : p
        )
      );

      // alert("Item quantity updated");
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const deleteItemFromCart = async (productId) => {
    try {
      const response = await fetch(
        `${productApiUrl}/cart/item/${productId}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_access")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item from cart");
      }

      // Update the state
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );

      // alert("Item removed from cart");
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const updateQuantity = (index, delta) => {
    const product = products[index];
    const newQuantity = product.quantity + delta;

    if (newQuantity < 1) {
      deleteItemFromCart(product.id);
    } else {
      adjustCartItemQuantity(product.id, newQuantity);
    }
  };

  const subTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const delivery = 50;
  const total = subTotal + delivery;

  const handleCheckout = async () => {
    const token = localStorage.getItem('jwt_access');

    const orderData = {
      shipping_address: address,
      payment_method: paymentMethod,
      total_price: total,
      items: products.map(p => ({
        product: p.id,
        quantity: p.quantity
      }))
    };
    console.log(orderData.items);
    try {
      const res = await fetch(`${productApiUrl}/cart/makeorder/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "Order created successfully!",
          icon: "success",
          confirmButtonText: "Proceed to Checkout",
        }).then(() => {
          localStorage.setItem('order_id', data.order_id);
          setProducts([]);
          window.location.href = '/checkout';
        });
      } else {
        console.error(data);
        Swal.fire({
          title: "Error",
          text: "Failed to create order.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Network error:", err);
      Swal.fire({
        title: "Error",
        text: "A network error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <Header></Header>
<div className="bg-orange-50 min-h-screen p-8 mt-10 text-black font-instrument">
  <h1 className="text-4xl font-bold mb-6">Basket</h1>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* LEFT: List or Empty Cart */}
    <div className="lg:col-span-2 space-y-4">
      {products.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center text-gray-600 py-16 space-y-4">
          <i className="fa-solid fa-cart-shopping text-8xl text-gray-400 animate-bounce" />
          <h2 className="text-2xl font-semibold">ตะกร้าของคุณยังว่างเปล่า</h2>
          <p className="text-md text-gray-500">ไปช้อปกันเถอะ 🛍️</p>
          <Link href="/category">
            <span className="mt-4 px-6 py-2 bg-yellow-800 text-white rounded-xl hover:bg-yellow-700 transition-all duration-200">
              ไปหน้าสินค้า
            </span>
          </Link>
        </div>
      ) : (
        products.map((p, index) => (
          <div
            key={p.id}
            className="flex items-center justify-between bg-white rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={p.image}
                alt="product"
                className="w-20 h-20 object-cover rounded-xl border"
              />
              <div>
                <p className="font-semibold text-lg">{p.name}</p>
                <p className="text-gray-600">{p.price} Bath</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(index, -1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                −
              </button>
              <span className="min-w-[24px] text-center">{p.quantity}</span>
              <button
                onClick={() => updateQuantity(index, 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={() => deleteItemFromCart(p.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              ลบ
            </button>
          </div>
        ))
      )}
    </div>

    {/* RIGHT: Order Summary */}
    <div className="bg-[#FFE5BE] p-6 rounded-xl shadow h-fit">
      <h2 className="text-xl font-bold mb-4">Order</h2>
      <div className="space-y-2 text-lg">
        <div className="flex justify-between">
          <span>Sub Total:</span>
          <span className="font-semibold">{subTotal} Bath</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery fee:</span>
          <span className="font-semibold">{delivery} Bath</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>Total Price:</span>
          <span>{total} Bath</span>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        className="mt-4 w-full bg-yellow-900 text-white py-2 rounded hover:bg-yellow-800"
      >
        Check out Now
      </button>
    </div>
  </div>
</div> 
<Footer/>

    </>
  );
}