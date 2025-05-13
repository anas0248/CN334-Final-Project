"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function Peyment() {
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/success");
  };

  return (
    <>
      <Header />
      <main className="p-6 md:p-10 bg-[#fdf6ec] min-h-screen flex items-center justify-center font-instrument">
        <div className="w-full max-w-md">
          <h1 className="text-[#754600] text-4xl md:text-6xl font-bold text-center mb-8">
            Payment
          </h1>

          <div className="relative z-10 bg-white p-10 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-3xl font-bold text-center text-[#8d4c2f] mb-6">
              กรุณาชำระเงิน
            </h1>

            <img src="../QR.jpg" alt="QR Code" className="w-full mb-6" />

            <button
              onClick={handleConfirm}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition mt-10"
            >
              Confirm
            </button>
          </div>
        </div>
      </main>
    </>
  );
}