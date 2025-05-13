"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Footer from "@/components/Footer";
import Swal from 'sweetalert2'; // นำเข้า SweetAlert2
import Loading from "@/components/Loading";

export default function Checkout() {
    const userApiUrl = process.env.NEXT_PUBLIC_USER_API_URL;
    const productApiUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        province: "",
        postcode: "",
        tel: "",
    });
    const [thisorder, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAddress = async () => {
            const token = localStorage.getItem("jwt_access");
            try {
                const customerres = await fetch(`${userApiUrl}/customer/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const profileres = await fetch(`${userApiUrl}/profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const orderres = await fetch(`${productApiUrl}/orders/my/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const orderdata = await orderres.json();
                const customerdata = await customerres.json();
                const profiledata = await profileres.json();
                if (customerres.ok && profileres.ok) {
                    console.log(customerdata);
                    console.log(profiledata);
                    setFormData({
                        name: profiledata.full_name || "",
                        address: customerdata.address || "",
                        province: customerdata.province || "",
                        postcode: customerdata.post_code || "",
                        tel: customerdata.phone_number || "",
                    });

                    orderdata.forEach(order => {
                        console.log("Order ID:", order.id);
                        if (order.id == localStorage.getItem("order_id")) {
                            console.log("Order ID matched:", order.items);
                            const filteredItems = order.items.map(item => ({
                                product: item.product,
                                quantity: item.quantity,
                            }));
                            console.log("Filtered items:", filteredItems);
                            setOrderData(filteredItems);
                        }
                    });

                    console.log("Order data:", thisorder);
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
        Swal.fire({
            title: 'เกิดข้อผิดพลาด!',
            text: 'ไม่พบหมายเลขคำสั่งซื้อ!',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
        setLoading(false);
        return;
    }

    try {
        console.log("Request Body:", JSON.stringify({
            items_write: thisorder,
            full_name: formData.name,
            phone_number: formData.tel,
            shipping_address: formData.address + " " + formData.province + " " + formData.postcode,
        }));
        const res = await fetch(`${productApiUrl}/orders/edit/${orderId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                items_write: thisorder,
                full_name: formData.name,
                phone_number: formData.tel,
                shipping_address: formData.address + " " + formData.province + " " + formData.postcode,
            }),
        });

        const data = await res.json();
        if (res.ok) {
            console.log("อัปเดตที่อยู่สำเร็จ:", data);
            Swal.fire({
                title: 'สำเร็จ!',
                text: 'อัปเดตที่อยู่สำเร็จ!',
                icon: 'success',
                confirmButtonText: 'ไปหน้าชำระเงิน'
            }).then(() => {
                window.location.href = '/payment';
            });
        } else {
            console.error("ไม่สามารถอัปเดตที่อยู่ได้:", data);
            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถอัปเดตที่อยู่ได้!',
                icon: 'error',
                confirmButtonText: 'ตกลง'
            });
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดขณะอัปเดตที่อยู่:", error);
        Swal.fire({
            title: 'เกิดข้อผิดพลาด!',
            text: 'เกิดข้อผิดพลาดขณะอัปเดตที่อยู่!',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
    } finally {
        setLoading(false);
    }
};

    if (loading) {
        return (
            <>
                <Header />
                <Loading/>
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