import Header from "@/components/Header";
import Footer from "@/components/Footer"
import Link from "next/link";

export default function Profile() {
  const data = {
    user: {
      username: "taeza007",
      name: "Panuwich",
      email: "Panuwich2747@gmail.com",
      address: "123/4 ท้ายทอง, จังหวัดพังงา",
      tel: "099999999",
      province: "พังงา",
      post_code: "82120",
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
      <Header  />
      <main className="min-h-screen">
  <div className="flex flex-col h-full">
    {/* My Account + Address Book */}
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {/* My Account */}
      <div className="bg-[#FFE5BE] rounded-xl pb-5">
        <h2 className="text-center text-[#754600] font-bold text-2xl md:text-3xl mt-5">My Account</h2>
        <div className="text-[#754600] text-lg md:text-2xl mx-6 mt-5 space-y-2">
          <div className="flex gap-3">
            <span>username:</span>
            <span>{user.username}</span>
          </div>
          <div className="flex gap-3">
            <span>Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex gap-3">
            <span>tel:</span>
            <span>{user.tel}</span>
          </div>
        </div>
      </div>

      {/* Address Book */}
      <div className="bg-[#FFE5BE] rounded-xl pb-5">
        <h2 className="text-center text-[#754600] font-bold text-2xl md:text-3xl mt-5">Address Book</h2>
        <div className="text-[#754600] mx-6 mt-5 text-lg md:text-2xl space-y-2">
          <div className="flex gap-3">
            <span>ชื่อ-นามสกุล:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex gap-3">
            <span>ที่อยู่:</span>
            <span>{user.address}</span>
          </div>
          <div className="flex gap-3">
            <span>จังหวัด:</span>
            <span>{user.province}</span>
          </div>
          <div className="flex gap-3">
            <span>รหัสไปรษณีย์:</span>
            <span>{user.post_code}</span>
          </div>
          <div className="flex gap-3">
            <span>โทร:</span>
            <span>{user.tel}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Orders */}
    <div className="w-full px-4 mt-10">
      <h1 className="text-3xl font-semibold text-black mb-6 text-center md:text-left">Order</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm md:text-base text-gray-800 divide-y divide-gray-200">
          <thead className="bg-[#FFE5BE]">
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
              <tr key={idx} className="odd:bg-white even:bg-[#FFF3E0]">
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
  </div>
</main>

      <Footer />
    </>
  );
}