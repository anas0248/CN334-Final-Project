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
      link: "/"
    },
    {
      id: 2,
      name: "สร้อยคอไข่มุก",
      price: 599,
      image: "../necklace.png",
      link: "/"
    },
    {
      id: 3,
      name: "แหวนเงินแท้",
      price: 299,
      image: "../ring.png",
      link: "/"
    },
    {
      id: 4,
      name: "กำไลข้อมือสแตนเลส",
      price: 199,
      image: "../bracelet.png",
      link: "/"
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-[#fdf6ec]">
        <h2 className="text-4xl font-bold text-center text-[#8d4c2f] my-10">
          เครื่องประดับ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 max-w-7xl mx-auto">
          {accessories.map((item) => (
            <Link key={item.id} href={item.link} className="hover:scale-105 duration-500">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
                <img className="rounded-t-lg" src={item.image} alt={item.name} />
                <div className="p-5 bg-[#D89C42]">
                  <h5 className="mb-2 text-xl font-bold text-gray-900 text-center">
                    {item.name}
                  </h5>
                  <h5 className="mb-2 text-xl font-bold text-gray-900 text-center">
                    {item.price} บาท
                  </h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
