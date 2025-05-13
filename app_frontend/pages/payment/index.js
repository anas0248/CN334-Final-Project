"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Swal from "sweetalert2";

export default function Payment() {
    const [selectedMethod, setSelectedMethod] = useState("");
    const router = useRouter();
    const productApiUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;
    const [thisorder, setOrderData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("jwt_access");
        const orderId = localStorage.getItem("order_id");
        if (!orderId) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่พบหมายเลขคำสั่งซื้อ!",
                icon: "error",
                confirmButtonText: "ตกลง",
            });
            return;
        }

        try {


            const res = await fetch(`${productApiUrl}/orders/edit/${orderId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items_write: thisorder,
                    "payment_method": selectedMethod,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                console.log("Payment method updated successfully:", data);
                Swal.fire({
                    title: "สำเร็จ!",
                    text: "บันทึกวิธีชำระเงินเรียบร้อยแล้ว!",
                    icon: "success",
                    confirmButtonText: "ตกลง",
                }).then(() => {
                    if (selectedMethod === "Cash on Delivery") {
                        window.location.href = "/success";
                    } else if (selectedMethod === "QR promptpay") {
                        window.location.href = "/payment/promtpay";
                    }
                });
            } else {
                console.error("Failed to update payment method:", data);
                Swal.fire({
                    title: "เกิดข้อผิดพลาด!",
                    text: "ไม่สามารถบันทึกวิธีชำระเงินได้!",
                    icon: "error",
                    confirmButtonText: "ตกลง",
                });
            }
        } catch (error) {
            console.error("Error updating payment method:", error);
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่พบคำสั่งซื้อนี้!",
                icon: "error",
                confirmButtonText: "ตกลง",
            });
        }
    };

    const selectpayment = async (method) => {
        const token = localStorage.getItem("jwt_access");
        const orderId = localStorage.getItem("order_id");

        try {
            // Fetch order details
            const orderRes = await fetch(`${productApiUrl}/orders/my/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!orderRes.ok) {
                throw new Error("Failed to fetch order details");
            }

            const orders = await orderRes.json();
            const currentOrder = orders.find(order => order.id == orderId);

            if (!currentOrder) {
                Swal.fire({
                    title: "เกิดข้อผิดพลาด!",
                    text: "ไม่พบคำสั่งซื้อ!",
                    icon: "error",
                    confirmButtonText: "ตกลง",
                });
                return;
            }

            // Set order data
            setOrderData(currentOrder.items.map(item => ({
                product: item.product,
                quantity: item.quantity,
            })));
            console.log("Order data:", currentOrder.items);

            // Set selected payment method
            setSelectedMethod(method);
        } catch (error) {
            console.error("Error fetching order details:", error);
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้!",
                icon: "error",
                confirmButtonText: "ตกลง",
            });
        }
    };

    return (
        <>
            <Header />
            <main className="p-6 md:p-10 bg-[#fdf6ec] min-h-screen flex items-center justify-center font-instrument">
                <div className="w-full max-w-md">
                    <h1 className="text-[#754600] text-4xl md:text-6xl font-bold text-center mb-8">
                        Payment
                    </h1>

                    {/* กล่องฟอร์ม */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full">
                        <form onSubmit={handleSubmit} className="space-y-6 text-base">
                            {/* คำอธิบาย */}
                            <div className="text-black text-center text-lg font-medium">
                                กรุณาเลือกวิธีชำระเงิน
                            </div>

                            {/* ปุ่มเลือกวิธีการชำระเงิน */}
                            <div className="space-y-4">
                                <button
                                    type="button"
                                    onClick={() => selectpayment("Cash on Delivery")}
                                    className={`w-full flex items-center justify-center gap-3 border rounded-xl py-3 px-4 font-medium text-black transition
                                    ${selectedMethod === "Cash on Delivery"
                                            ? "bg-[#d9f99d] border-green-500"
                                            : "bg-white border-gray-300 hover:bg-gray-100"}`}
                                >
                                    <img
                                        src="/CurrencyExchange.png"
                                        alt="เก็บเงินปลายทาง"
                                        className="w-6 h-6"
                                    />
                                    เก็บเงินปลายทาง
                                </button>

                                <button
                                    type="button"
                                    onClick={() => selectpayment("QR promptpay")}
                                    className={`w-full flex items-center justify-center gap-3 border rounded-xl py-3 px-4 font-medium text-black transition
                                    ${selectedMethod === "QR promptpay"
                                            ? "bg-[#bfdbfe] border-blue-500"
                                            : "bg-white border-gray-300 hover:bg-gray-100"}`}
                                >
                                    <img
                                        src="/promtpay.png"
                                        alt="Prompt Pay"
                                        className="w-6 h-6"
                                    />
                                    Prompt Pay
                                </button>
                            </div>

                            {/* ปุ่ม Confirm */}
                            <button
                                type="submit"
                                disabled={!selectedMethod}
                                className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition
                                ${selectedMethod
                                        ? "bg-[#d89c42] hover:bg-[#b37a2d]"
                                        : "bg-gray-400 cursor-not-allowed"}`}
                            >
                                ยืนยันการชำระเงิน
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}