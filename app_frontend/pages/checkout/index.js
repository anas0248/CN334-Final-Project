"use client";
import Header from "@/components/Header";
import Link from "next/link";

export default function Checkout() {
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
                                    placeholder="tel"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>

                            <Link
                                href="/payment"
                                className="block w-full bg-[#d89c42] hover:bg-[#b37a2d] text-white text-center font-semibold py-3 text-lg rounded-lg transition"
                            >
                                ไปหน้าชำระเงิน
                            </Link>

                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
