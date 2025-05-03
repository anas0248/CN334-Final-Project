import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;

        const token = localStorage.getItem("jwt_access");
        console.log("Token:", token);
        console.log("Product ID:", id);

        if (!token) {
            console.log("No token found. Please log in.");
            setError("No token found. Please log in.");
            return;
        }

        fetch(`http://127.0.0.1:3341/products/${id}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                if (res.status === 401) {
                    console.error("Unauthorized. Please log in again.");
                    setError("Unauthorized. Please log in again.");
                    setProduct(null);
                    return;
                }
                if (res.status === 404) {
                    setError("Product ID not Found!");
                    setProduct(null);
                    return;
                }
                if (!res.ok) {
                    throw new Error("Failed to fetch product.");
                }
                return res.json();
            })
            .then((data) => {
                if (data && data.data) {
                    setProduct(data.data);
                } else {
                    setError("Product ID not Found!"); // <<-- กรณี data ว่าง
                    setProduct(null);
                }
            })
            .catch((err) => {
                console.error(err.message);
                setError("Product ID not Found!");  // <<-- กรณี error อื่น
                setProduct(null);
            });
    }, [id]);

    if (error) return <p>{JSON.stringify({ error: error })}</p>;
    if (!product) return <p>Loading product data...</p>;

    return (
        // <main className='flex min-h-screen flex-col items-center justify-between p-8'>
        //     <div style={{ fontSize: "48px" }}
        //         className="w-full flex flex-col justify-center items-center dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
        //         <div>Product Details</div>
        //         <div className="mt-4 text-left">
        //             <p><strong>Name:</strong> {product.name}</p>
        //             <p><strong>Description:</strong> {product.description}</p>
        //             <p><strong>Price:</strong> ${product.pr ice}</p>
        //             <p><strong>Category:</strong> {product.category}</p>
        //             <p><strong>Stock:</strong> {product.stock}</p>
        //         </div>
        //     </div>
        // </main>
        <>
            <Header></Header>
            <main>
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 text-black mt-20 gap-8">
    {/* ซ้าย */}
    <div className=" grid place-items-center min-h-[300px]">
      <img src="../5-Photoroom.png" alt="จักสาน" className="w-full max-w-2xl h-auto" />
    </div>

    {/* ขวา */}
    <div className=" p-5">
      <div className="text-7xl mb-10">
        <h1>ต่างหูแก้วคริสตัล</h1>
      </div>
      <div className="text-5xl mb-10">
        <h1>Product Detail</h1>
      </div>
      <div className="text-2xl mb-10">
        <h2>
        เติมความหวานให้ลุคของคุณด้วยต่างหูแก้วคริสตัลสุดน่ารัก ดีไซน์รูปดอกไม้สีชมพูสดใส ร้อยด้วยลูกปัดแก้วสีขาวมุก เพิ่มความวิบวับและน่ารักในทุกมุมมอง เหมาะสำหรับใส่ในชีวิตประจำวัน หรือโอกาสพิเศษ
วัสดุ:
ลูกปัดแก้ว
ตะขอเกี่ยวทองเหลืองชุบทอง
ขนาด:
เส้นผ่านศูนย์กลางจี้ประมาณ 2 ซม.
ความยาวรวมประมาณ 3.5 ซม. (รวมตะขอ)
        </h2>
      </div>
      <div className="text-5xl mb-5">399 บาท</div>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-[#754600] text-white p-5 rounded hover:scale-105 duration-300">
          Buy Now
        </button>
        <button className="bg-[#D89C42] text-white p-5 rounded hover:scale-105 duration-300 ">
          Add to Basket
        </button>
      </div>
    </div>
  </div>
</main>

        </>
    );
}
