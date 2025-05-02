import Header from "@/components/Header";
import Footer from "@/components/Footer"
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <Header></Header>
      <main >
        <div className="p-10 bg-[#fdf6ec] grid grid-cols-2 mt-10 gap-6">
          <div className="bg-[#FFE5BE] rounded pb-5">
            <h2 className="text-center text-[#754600] font-bold text-3xl mt-5">My Account</h2>
            <div className="text-[#754600] max-w-m mx-10 mt-5">
              <div className="flex gap-3">
                <h2 className="text-3xl">Name: </h2>
                <h2 className="text-3xl">Panuwich</h2>
              </div>
              <div className="flex gap-3">
                <h2 className="text-3xl">Email: </h2>
                <h2 className="text-3xl">Panuwich2747@gmail.com</h2>
              </div>
            </div>
          </div>
          <div className="bg-[#FFE5BE] rounded ">
            <h2 className="text-center text-[#754600] font-bold text-3xl mt-5">Address Book</h2>
            <div className="text-[#754600] max-w-m mx-10 mt-5">
              <div className="flex gap-3">
                <h2 className="text-3xl">Name: </h2>
                <h2 className="text-3xl">Panuwich</h2>
              </div>
              <div className="flex gap-3">
                <h2 className="text-3xl">Email: </h2>
                <h2 className="text-3xl">Panuwich2747@gmail.com</h2>
              </div>
            </div>

          </div>
        </div>


        <div className="mx-auto items-center max-w-7xl px-4">
          <h1 className="text-4xl font-semibold text-black mb-6">Order</h1>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-base text-gray-800 divide-y divide-gray-200">
              <thead className="">
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
                <tr className="">
                  <td className="px-4 py-2">#00123</td>
                  <td className="px-4 py-2">ผ้าทอมือ</td>
                  <td className="px-4 py-2">฿250</td>
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">฿500</td>
                  <td className="px-4 py-2 text-green-600 font-medium">จัดส่งแล้ว</td>
                </tr>
                <tr className="">
                  <td className="px-4 py-2">#00123</td>
                  <td className="px-4 py-2">ผ้าทอมือ</td>
                  <td className="px-4 py-2">฿250</td>
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">฿500</td>
                  <td className="px-4 py-2 text-green-600 font-medium">จัดส่งแล้ว</td>
                </tr>
                <tr className="">
                  <td className="px-4 py-2">#00123</td>
                  <td className="px-4 py-2">ผ้าทอมือ</td>
                  <td className="px-4 py-2">฿250</td>
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">฿500</td>
                  <td className="px-4 py-2 text-green-600 font-medium">จัดส่งแล้ว</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
      <Footer></Footer>
    </>
  );
}