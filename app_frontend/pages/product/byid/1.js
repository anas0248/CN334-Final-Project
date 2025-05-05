import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const mockProducts = [
  {
    id: '1',
    name: 'ต่างหูแก้วคริสตัล',
    image: '../5-Photoroom.png',
    description: `เติมความหวานให้ลุคของคุณด้วยต่างหูแก้วคริสตัลสุดน่ารัก ดีไซน์รูปดอกไม้สีชมพูสดใส ร้อยด้วยลูกปัดแก้วสีขาวมุก เพิ่มความวิบวับและน่ารักในทุกมุมมอง เหมาะสำหรับใส่ในชีวิตประจำวัน หรือโอกาสพิเศษ

วัสดุ:
- ลูกปัดแก้ว
- ตะขอเกี่ยวทองเหลืองชุบทอง

ขนาด:
- เส้นผ่านศูนย์กลางจี้ประมาณ 2 ซม.
- ความยาวรวมประมาณ 3.5 ซม. (รวมตะขอ)`,
    price: 399,
  },
];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  console.log('Product ID:', id);
  useEffect(() => {
    if (id) {
      const found = mockProducts.find((p) => p.id === id);
      setProduct(found || null);
    }
  }, [id]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 text-black items-center justify-center min-h-screen gap-8">
          {/* ซ้าย: รูป */}
          <div className="grid place-items-center min-h-[300px]">
            <img src={product.image} alt={product.name} className="w-full max-w-2xl h-auto" />
          </div>

          {/* ขวา: รายละเอียด */}
          <div className="p-5">
            <div className="text-4xl md:text-6xl font-semibold mb-6">
              <h1>{product.name}</h1>
            </div>
            <div className="text-2xl whitespace-pre-line mb-6">
              {product.description}
            </div>
            <div className="text-4xl text-[#754600] font-bold mb-6">
              {product.price} บาท
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-[#754600] text-white p-5 rounded hover:scale-105 duration-300">
                Buy Now
              </button>
              <button className="bg-[#D89C42] text-white p-5 rounded hover:scale-105 duration-300">
                Add to Basket
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}