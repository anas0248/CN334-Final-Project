// pages/basket.js
"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';


export default function Basket() {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('jwt_access');
      console.log(token);
      try {
        const res = await fetch('http://127.0.0.1:3341/cart', {
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
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = (index, delta) => {
    const updated = [...products];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    setProducts(updated);
  };

  const deleteProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const subTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const delivery = 50;
  const total = subTotal + delivery;

  const handleCheckout = async () => {
    const token = localStorage.getItem('jwt_access'); // หรือที่เก็บ token ของคุณ
  
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
      const res = await fetch("http://localhost:3341/orders/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("✅ Order created successfully");
        // setProducts([]);
        window.location.href = '/checkout';
      } else {
        console.error(data);
        alert("❌ Failed to create order");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("❌ Network error");
    }
  };
  

  return (
    <>
    <Header></Header>
    <div className="bg-orange-50 min-h-screen p-8 mt-10 text-black font-instrument">
      <h1 className="text-4xl font-bold mb-6">Basket</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {products.map((p, index) => (
            <div key={p.id} className="flex items-center justify-between bg-white rounded-xl p-4 shadow">
              <div className="flex items-center space-x-4">
                <img src={p.image} alt="product" className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-gray-600">{p.price} Bath</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(index, -1)} className="px-2 bg-gray-200 rounded">−</button>
                <span>{p.quantity}</span>
                <button onClick={() => updateQuantity(index, 1)} className="px-2 bg-gray-200 rounded">+</button>
              </div>

              <button onClick={() => deleteProduct(index)} className="bg-red-500 text-white px-4 py-1 rounded">
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="bg-[#FFE5BE] p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Order</h2>
          <div className="space-y-2 text-lg">
            <div className="flex justify-between">
              <span>Sub Total:</span> <span className="font-semibold">{subTotal} Bath</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery fee:</span> <span className="font-semibold">{delivery} Bath</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Price:</span> <span>{total} Bath</span>
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
    </>
  );
}