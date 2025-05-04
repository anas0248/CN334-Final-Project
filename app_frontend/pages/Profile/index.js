import Header from "@/components/Header";
import Footer from "@/components/Footer"
import Link from "next/link";

export default function Profile() {
  const data = {
    user: {
      name: "Panuwich",
      email: "Panuwich2747@gmail.com",
      address: "123/4 ท้ายทอง, จังหวัดพังงา",
    },
    orders: [
      {
        id: "#00123",
        product: "ผ้าทอมือ",
        price: 250,
        quantity: 2,
        status: "จัดส่งแล้ว",
      },
      {
        id: "#00124",
        product: "จักสานไม้ไผ่",
        price: 150,
        quantity: 1,
        status: "กำลังจัดส่ง",
      },
      {
        id: "#00125",
        product: "เครื่องประดับเงิน",
        price: 300,
        quantity: 3,
        status: "จัดส่งแล้ว",
      },
    ],
  };

    const { user, orders } = data;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="p-10 bg-[#fdf6ec] grid grid-cols-2 mt-10 gap-6 ">
          <div className="bg-[#FFE5BE] rounded rounded-xl pb-5">
            <h2 className="text-center text-[#754600] font-bold text-3xl mt-5">My Account</h2>
            <div className="text-[#754600] text-2xl mx-10 mt-5">
              <div className="flex gap-3">
                <h2 className="">Name:</h2>
                <h2 className="">{user.name}</h2>
              </div>
              <div className="flex gap-3">
                <h2 className="">Email:</h2>
                <h2 className="">{user.email}</h2>
              </div>
            </div>
          </div>

          <div className="bg-[#FFE5BE] rounded rounded-xl pb-5 h-full text-3xl">
            <h2 className="text-center text-[#754600] font-bold  mt-5">Address Book</h2>
            <div className="text-[#754600] mx-10 mt-5 text-2xl">
              <div className="flex gap-3">
                <h2 className="">Name:</h2>
                <h2 className="">{user.name}</h2>
              </div>
              <div className="flex gap-3">
                <h2 className="">Address:</h2>
                <h2 className="">{user.address}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto items-center max-w-7xl px-4">
          <h1 className="text-4xl font-semibold text-black mb-6">Order</h1>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-base text-gray-800 divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.product}</td>
                    <td className="px-4 py-2">฿{order.price}</td>
                    <td className="px-4 py-2">{order.quantity}</td>
                    <td className="px-4 py-2">฿{order.price * order.quantity}</td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        order.status === "จัดส่งแล้ว"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}