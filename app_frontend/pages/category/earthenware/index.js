
import Header from "@/components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Footer from "@/components/Footer";


export default function Earthenware() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const category = 'earthenware';
  const productApiUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;
  
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        console.log(`${productApiUrl}/category/${category}/`);
        const response = await fetch(`${productApiUrl}/category/${category}/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        setInfo(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error fetching accessories:", error);
      }
    };

    fetchAccessories();
  }, []);

  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");    
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('jwt_access');
      console.log(token);
      try {
        const res = await fetch(`${productApiUrl}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          setProducts(data); // สมมุติว่า backend ส่ง array ของสินค้าในตะกร้ามา
        } else {
          console.error(data);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        console.log(`${url}/category/${category}/`);
        const response = await fetch(`${productApiUrl}/test-cors/`);
        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };

    fetchTest();
  }, []);

  
  if (loading) {
    return <p className="text-center py-8">กำลังโหลดเครื่องประดับ...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">เกิดข้อผิดพลาดในการโหลดเครื่องประดับ</p>;
  }
  return (
    <>
      <Header />
      <main className="bg-[#fdf6ec] px-4 sm:px-6 lg:px-8 mt-20 min-h-screen">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#8d4c2f] my-8 sm:my-10">
          เครื่องปั้นดินเผา
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {info.map((item) => (
            console.log('Anas',item),
            <Link
              key={item.id}
              onClick={() => {
                localStorage.setItem('productId', item.id);
                console.log(`Product ID ${item.id} saved to localStorage`);
              }}
              href={'/product'}
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
      <Footer/>
    </>
  );
}