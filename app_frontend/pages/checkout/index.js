"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Footer from "@/components/Footer";

export default function Checkout() {
    const userApiUrl = process.env.NEXT_PUBLIC_USER_API_URL;
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        province: "",
        postcode: "",
        tel: "",
    });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAddress = async () => {
            const token = localStorage.getItem("jwt_access");
            try {
                const res = await fetch(`${userApiUrl}/profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                if (res.ok) {
                    console.log(data);
                    setFormData({
                        name: data.fullname || "",
                        address: data.address || "",
                        province: data.province || "",
                        postcode: data.post_code || "",
                        tel: data.phone_number || "",
                    });
                    console.log(formData.address);
                } else {
                    console.error("Failed to fetch profile:", data);
                }
            } catch (err) {
                console.error("Error fetching address:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAddress();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const addadress = async () => {
        const token = localStorage.getItem("jwt_access");
        const orderId = localStorage.getItem("order_id");
        if (!orderId) {
            alert("Missing order ID!");
            setLoading(false);
            return;
        }
        
        try {
            const res = await fetch(`${userApiUrl}/orders/edit/${orderId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    full_name: formData.name,
                    phone_number: formData.tel,
                    shipping_address: formData.address+" " + formData.province+" " + formData.postcode,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                console.log("Address updated successfully:", data);
                alert("Address updated successfully!");
                window.location.href = '/payment';
            } else {
                console.error("Failed to update address:", data);
                alert("Failed  to update address!");
            }
        } catch (error) {
            console.error("Error updating address:", error);
            alert("Error updating address!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="p-6 md:p-10 bg-[#fdf6ec] min-h-screen flex items-center justify-center font-instrument">
                    <div className="w-full max-w-md text-center">
                        <p className="text-gray-700">Loading your profile information...</p>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <Header />
            <main className="p-6 md:p-10 bg-[#fdf6ec] min-h-screen flex items-center justify-center font-instrument">
                <div className="w-full max-w-md">
                    <h1 className="text-[#754600] text-4xl md:text-6xl font-bold text-center mb-8">
                        Checkout
                    </h1>

                    {/* กล่องฟอร์ม */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full">
                        <form className="space-y-5 text-base text-black">
                            <div>
                                <label htmlFor="name" className="block mb-1 text-gray-700 text-sm font-medium">
                                    ชื่อ - นามสกุล
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="fullname"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-1 text-gray-700 text-sm font-medium">
                                    ที่อยู่
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="address"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="province" className="block mb-1 text-gray-700 text-sm font-medium">
                                        จังหวัด
                                    </label>
                                    <input
                                        type="text"
                                        id="province"
                                        name="province"
                                        value={formData.province}
                                        onChange={handleChange}
                                        placeholder="province"
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="postcode" className="block mb-1 text-gray-700 text-sm font-medium">
                                        รหัสไปรษณีย์
                                    </label>
                                    <input
                                        type="text"
                                        id="postcode"
                                        name="postcode"
                                        value={formData.postcode}
                                        onChange={handleChange}
                                        placeholder="post code"
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="tel" className="block mb-1 text-gray-700 text-sm font-medium">
                                    เบอร์โทรศัพท์
                                </label>
                                <input
                                    type="tel"
                                    id="tel"
                                    name="tel"
                                    value={formData.tel}
                                    onChange={handleChange}
                                    placeholder="tel"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={addadress}
                                className="w-full bg-[#d89c42] hover:bg-[#b37a2d] text-white text-center font-semibold py-3 text-lg rounded-lg transition"
                            >
                                ไปหน้าชำระเงิน
                            </button>

                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}