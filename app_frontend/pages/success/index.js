"use client";
import { useState, useEffect, useCallback } from 'react';
import Header from "@/components/Header";

export default function Peyment() {
    const [order, setOrder] = useState(null);
    const [shipping, setShipping] = useState(null); // State สำหรับเก็บข้อมูลการจัดส่ง
    const [loading, setLoading] = useState(true);
    const productApiUrl = process.env.NEXT_PUBLIC_USER_API_URL;

    // Use useCallback to memoize the fetch function
    const fetchOrderAndShipping = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch order data
            const orderRes = await fetch(`${productApiUrl}/orders/my/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt_access")}`}
            });
            const orderData = await orderRes.json();

            if (!orderData) {
                console.error("Orders not found");
                setOrder(null);
                setShipping(null);
                setLoading(false);
                return;
            }

            const orderId = localStorage.getItem("order_id");
            const myOrder = orderData.find(o => o.id === parseInt(orderId));  // find order

            if (!myOrder) {
                console.error("Order not found for order ID:", orderId);
                setOrder(null);
                setShipping(null);
                setLoading(false);
                return;
            }
            setOrder(myOrder);
            console.log(myOrder);

            try { // Try-catch block for shipping fetch
                const shippingRes = await fetch(`${productApiUrl}/shipping/${orderId}/`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_access")}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tracking_number: Math.random().toString().slice(2, 12),
                        courier_name: myOrder.full_name,
                        shipped_date: new Date().toISOString(),
                    }),
                });
                const shippingData = await shippingRes.json();

                if (shippingRes.ok) {
                    setShipping(shippingData);
                } else if (shippingRes.status === 404) {
                    setShipping(null);
                }
                 else {
                    console.error("Failed to fetch shipping data:", shippingData);
                    if (!(shippingData && shippingData.order && Array.isArray(shippingData.order))) {
                        setShipping(null); // Only set to null if it's NOT the specific error
                    }
                }
            } catch (shippingError) {
                console.error("Error fetching shipping data:", shippingError);
                //  setShipping(null);  // Don't set shipping to null in catch, handle in the if/else
            }


        } catch (error) {
            console.error("Error fetching data:", error);
            setOrder(null);
            setShipping(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrderAndShipping();
    }, [fetchOrderAndShipping]);

    if (loading) {
        return (
            <>
                <Header />
                <main className="p-6 md:p-10 bg-[#fdf6ec] min-h-screen flex items-center justify-center font-instrument">
                    <div className="w-full max-w-md">
                        <p className="text-red-500 text-center">Loading...</p>
                    </div>
                </main>
            </>
        );
    }

    if (!order) {
        return (
            <>
                <Header />
                <main className="p-6 md:p-10 bg-[#fdf6ec] min-h-screen flex items-center justify-center font-instrument">
                    <div className="w-full max-w-md">
                        <p className="text-red-500 text-center">Order Not Found</p>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="p-6 md:p-10 bg-[#fdf6ec] min-h-screen flex items-center justify-center font-instrument">
                <div className="w-full max-w-md">
                    <h1 className="text-[#754600] text-4xl md:text-6xl font-bold text-center mb-8">
                        Payment
                    </h1>

                    <div className="relative z-10 bg-white p-10 rounded-lg shadow-md w-full max-w-md">
                        <div className="text-green-600 text-9xl text-center">
                            <i className="fa-solid fa-circle-check text-green-600 text-9xl animate__animated animate__tada"></i>
                        </div>
                        <h1 className="text-5xl mt-5 text-center text-[#8d4c2f] mb-6">
                            {order.total_price} Bath
                        </h1>
                        <h1 className="text-2xl mt-2 text-center text-[#8d4c2f] mb-2">
                            ID: {shipping?.tracking_number || order.id}
                        </h1>
                        <h1 className="text-2xl mt-2 text-center text-[#8d4c2f] mb-6">
                            Name: {order.full_name}
                        </h1>
                        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition mt-6"
                            onClick={() => {
                                localStorage.removeItem("order_id");
                                window.location.href = "/category";
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
