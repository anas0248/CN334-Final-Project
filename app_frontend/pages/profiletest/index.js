import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function Profile() {
    const [showModal, setShowModal] = useState(false);
    const [showModalAddress, setShowModalAddress] = useState(false);

    const user = {
        username: "mockuser",
        email: "mockuser@example.com",
        phone_number: "0123456789",
        full_name: "Mock User",
        address: "123 Mockingbird Lane",
        province: "Bangkok",
        post_code: "10110",
    };

    const orders = [
        {
            id: 1,
            shipping: {
                status: "จัดส่งแล้ว",
                tracking_number: "MOCK123456TH",
                courier_name: "MockExpress",
            },
            items: [
                {
                    product_name: "Mock Product A",
                    price_at_order_time: 250,
                    quantity: 2,
                },
                {
                    product_name: "Mock Product B",
                    price_at_order_time: 150,
                    quantity: 1,
                },
            ],
        },
        {
            id: 2,
            shipping: {
                status: "กำลังจัดส่ง",
                tracking_number: "MOCK654321TH",
                courier_name: "MockDelivery",
            },
            items: [
                {
                    product_name: "Mock Product C",
                    price_at_order_time: 400,
                    quantity: 1,
                },
            ],
        },
    ];

    const [formDatAddress, setFormDatAddress] = useState({
        full_name: user.full_name || '',
        address: user.address || '',
        province: user.province || '',
        post_code: user.post_code || ''
    });

    const handleSaveAddress = async () => {
        try {
            console.log('Sending data:', formDatAddress);
            // เรียก API 
            setShowModalAddress(false);
        } catch (error) {
            console.error('Failed to save:', error);
        }
    };

    const [formDataAccount, setFormDatAccount] = useState({
        full_name: user.full_name || '',
        email: user.email || '',
    });

    const handleSaveAccount = async () => {
        try {
            console.log('Sending data:', formDataAccount);
            // เรียก API 
            setShowModalAddress(false);
        } catch (error) {
            console.error('Failed to save:', error);
        }
    };



    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#fdf6ec]">
                <div className="flex flex-col h-full">
                    {/* My Account + Address Book */}
                    <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 sm:mt-10 max-w-7xl mx-auto">
                        {/* My Account */}
                        <div className="bg-white rounded-xl shadow-md pb-4 sm:pb-5 flex">
                            <div className="justify-between">
                                <h2 className="text-center text-[#754600] font-bold text-2xl md:text-3xl mt-4 sm:mt-5">My Account</h2>
                                <div className="text-[#754600] text-lg md:text-xl mx-4 sm:mx-6 mt-4 sm:mt-5 space-y-2">
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium">Username:</span>
                                        <span>{user.username}</span>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium">Email:</span>
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium">Phone:</span>
                                        <span>{user.phone_number || user.tel || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Button to open the modal */}
                            <button
                                onClick={() => setShowModal(true)}
                                className="ml-auto mt-4 mr-4 p-2 rounded-full  text-yellow-700 "
                                type="button"
                            >
                                <i className="fa-solid fa-pen-to-square text-xl"></i>
                            </button>


                            {/* Modal */}
                            {showModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                                        {/* Modal Header */}
                                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                                            <h3 className="text-lg  text-black font-semibold">Edit Account</h3>
                                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
                                                &times;
                                            </button>
                                        </div>

                                        {/* Modal Body */}
                                        <form className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                                <input className=" text-black w-full border rounded px-3 text-black py-2 mt-1"
                                                    type="text"
                                                    value={formDataAccount.full_name}
                                                    onChange={(e) => setFormDatAccount({ ...formDataAccount, full_name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                                <input type="email" className=" text-black w-full border rounded px-3 text-black py-2 mt-1" placeholder="you@example.com"
                                                    value={formDataAccount.email}
                                                    onChange={(e) => setFormDatAccount({ ...formDataAccount, email: e.target.value })} />
                                            </div>
                                        </form>

                                        {/* Modal Footer */}
                                        <div className="flex justify-end mt-6 space-x-2">
                                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                                Cancel
                                            </button>
                                            <button onClick={handleSaveAddress} className="px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-700">
                                                Save
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Address Book */}
                        <div className="bg-white rounded-xl shadow-md pb-4 sm:pb-5 flex">
                            <div className="">
                                <h2 className="text-center text-[#754600] font-bold text-2xl md:text-3xl mt-4 sm:mt-5">Address Book</h2>
                                <div className="text-[#754600] mx-4 sm:mx-6 mt-4 sm:mt-5 text-lg md:text-xl space-y-2">
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium">Full Name:</span>
                                        <span>{user.full_name}</span>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium">Address:</span>
                                        <span>{user.address}</span>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium">Province:</span>
                                        <span>{user.province}</span>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium">Postal Code:</span>
                                        <span>{user.post_code}</span>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium">Phone:</span>
                                        <span>{user.phone_number || user.tel || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Button to open the modal */}
                            <button
                                onClick={() => setShowModalAddress(true)}
                                className="ml-auto mt-4 mr-4 p-2 rounded-full  text-yellow-700 "
                                type="button"
                            >
                                <i className="fa-solid fa-pen-to-square text-xl"></i>
                            </button>

                            {/* Modal */}
                            {showModalAddress && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                                        {/* Modal Header */}
                                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                                            <h3 className="text-lg text-black  font-semibold">Edit Address Book</h3>
                                            <button onClick={() => setShowModalAddress(false)} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
                                                &times;
                                            </button>
                                        </div>

                                        {/* Modal Body */}
                                        <form className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                                <input type="text" className="w-full border rounded px-3 text-black py-2 mt-1" placeholder="Your name"
                                                    value={formDatAddress.full_name}
                                                    onChange={(e) => setFormDatAddress({ ...formDatAddress, full_name: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                                <input type="text" className="w-full border rounded px-3 text-black py-2 mt-1" placeholder=""
                                                    value={formDatAddress.address}
                                                    onChange={(e) => setFormDatAddress({ ...formDatAddress, address: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Province</label>
                                                <input type="text" className="w-full border rounded px-3 text-black py-2 mt-1" placeholder=""
                                                    value={formDatAddress.province}
                                                    onChange={(e) => setFormDatAddress({ ...formDatAddress, province: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Post code</label>
                                                <input type="text" className="w-full border rounded px-3 text-black py-2 mt-1" placeholder=""
                                                    value={formDatAddress.post_code}
                                                    onChange={(e) => setFormDatAddress({ ...formDatAddress, post_code: e.target.value })} />
                                            </div>
                                        </form>

                                        {/* Modal Footer */}
                                        <div className="flex justify-end mt-6 space-x-2">
                                            <button onClick={() => setShowModalAddress(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                                Cancel
                                            </button>
                                            <button onClick={handleSaveAccount} className="px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-700">
                                                Save
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Orders */}
                    <div className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 max-w-7xl mx-auto">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center sm:text-left">Order History</h1>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm md:text-base text-gray-800 divide-y divide-gray-200 border-collapse border border-gray-200">
                                <thead className="bg-[#FFE5BE]">
                                    <tr>
                                        <th className="px-4 py-2 text-left border-b border-gray-200">Order ID</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200">Product</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200">Price</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200">Quantity</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200">Total</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200">Status</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200">Tracking Number</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200">Courier Name</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {orders.map((order, idx) => {
                                        console.log('Anas1', order);
                                        if (!order.shipping) {
                                            return null;
                                        }
                                        return order.items.map((item, itemIdx) => (
                                            console.log('Anas2', item),
                                            <tr key={`${idx}-${itemIdx}`} className="hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-4 py-2 border-b border-gray-200">{order.id}</td>
                                                <td className="px-4 py-2 border-b border-gray-200">{item.product_name}</td>
                                                <td className="px-4 py-2 border-b border-gray-200">฿{item.price_at_order_time}</td>
                                                <td className="px-4 py-2 border-b border-gray-200">{item.quantity}</td>
                                                <td className="px-4 py-2 border-b border-gray-200">฿{item.price_at_order_time * item.quantity}</td>
                                                <td
                                                    className={`px-4 py-2 font-medium border-b border-gray-200 ${order.shipping.status === "จัดส่งแล้ว" ? "text-green-600" : "text-yellow-600"
                                                        }`}
                                                >
                                                    {order.shipping.status}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200">{order.shipping.tracking_number || "N/A"}</td>
                                                <td className="px-4 py-2 border-b border-gray-200">{order.shipping.courier_name || "N/A"}</td>
                                            </tr>
                                        ));
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
