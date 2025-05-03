"use client";
import Header from "@/components/Header";
import Link from "next/link";

export default function Accessories() {
  const accessories = [
    {
      id: 1,
      name: "ต่างหูแก้วคริสตัล",
      price: 399,
      image: "../5-Photoroom.png",
      link: "/",
    },
    {
      id: 2,
      name: "สร้อยคอไข่มุก",
      price: 599,
      image: "../necklace.png",
      link: "/",
    },
    {
      id: 3,
      name: "แหวนเงินแท้",
      price: 299,
      image: "../ring.png",
      link: "/",
    },
    {
      id: 4,
      name: "กำไลข้อมือสแตนเลส",
      price: 199,
      image: "../bracelet.png",
      link: "/",
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#fdf6ec] px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#8d4c2f] my-8 sm:my-10">
        กะลาพร้าว
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {accessories.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="transition-transform transform hover:scale-105 duration-300"
            >
              <div className="w-full bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                <img
                  className="w-full h-48 sm:h-52 md:h-56 object-cover object-center"
                  src={item.image}
                  alt={item.name}
                />
                <div className="p-4 bg-[#D89C42]">
                  <h5 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 text-center mb-1">
                    {item.name}
                  </h5>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-center text-gray-800">
                    {item.price} บาท
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
