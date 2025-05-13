
import Header from "@/components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Swal from "sweetalert2";
import Footer from "@/components/Footer";

export default function Basket() {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const productApiUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;

  useEffect(() => {
    const fetchCart = async () => {
      localStorage.removeItem('order_id');
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
          if (data && data.items && Array.isArray(data.items)) {
            const productList = data.items.map(item => ({
              id: item.product,
              name: item.product_detail.name,
              price: parseFloat(item.product_detail.price),
              quantity: item.quantity,
              image: item.product_detail.image,
            }));
            setProducts(productList);
          } else {
            setProducts([]);
          }
        } else {
          console.error(data);
          if (res.status === 401) {
            Swal.fire({
              title: "เซสชันหมดอายุ",
              text: "กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
              icon: "warning",
              confirmButtonText: "ตกลง",
            });
          } else {
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถดึงข้อมูลตะกร้าสินค้าได้",
              icon: "error",
              confirmButtonText: "ตกลง",
            });
          }
          localStorage.removeItem('jwt_access');
          router.push('/login');
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดขณะดึงข้อมูลตะกร้าสินค้า",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const adjustCartItemQuantity = async (productId, quantity) => {
    try {
      const response = await fetch(
        `${productApiUrl}/cart/item/${productId}/adjust/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_access")}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );
     if (!response.ok) {
        throw new Error("ไม่สามารถอัปเดตจำนวนสินค้าได้");
      }

      // Update the state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, quantity } : p
        )
      );

      // alert("Item quantity updated");
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถอัปเดตจำนวนสินค้าได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  const deleteItemFromCart = async (productId) => {
    try {
      const response = await fetch(
        `${productApiUrl}/cart/item/${productId}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_access")}`,
          },
        }
      );

     if (!response.ok) {
        throw new Error("ไม่สามารถลบสินค้าออกจากตะกร้าได้");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );

      Swal.fire({
        title: "สำเร็จ",
        text: "ลบสินค้าออกจากตะกร้าเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });

    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบสินค้าออกจากตะกร้าได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  const updateQuantity = (index, delta) => {
    const product = products[index];
    const newQuantity = product.quantity + delta;

    if (newQuantity < 1) {
      deleteItemFromCart(product.id);
    } else {
      adjustCartItemQuantity(product.id, newQuantity);
    }
  };

  const subTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const delivery = 50;
  const total = subTotal + delivery;

  const handleCheckout = async () => {
    const token = localStorage.getItem('jwt_access');

    const orderData = {
      shipping_address: address,
      payment_method: paymentMethod,
      total_price: total,
      items: products.map(p => ({
        product: p.id,
        quantity: p.quantity
      }))
    };
    console.log(orderData.items);
    try {
      const res = await fetch(`${productApiUrl}/cart/makeorder/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

     const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "สำเร็จ!",
          text: "สร้างคำสั่งซื้อเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ไปที่หน้าชำระเงิน",
        }).then(() => {
          localStorage.setItem('order_id', data.order_id);
          setProducts([]);
          window.location.href = '/checkout';
        });
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถสร้างคำสั่งซื้อได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "เกิดข้อผิดพลาดขณะสร้างคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <>
      <Header></Header>
<div className="bg-orange-50 min-h-screen p-8 mt-10 text-black font-instrument">
  <h1 className="text-4xl font-bold mb-6">Basket</h1>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

    <div className="lg:col-span-2 space-y-4">
      {products.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center text-gray-600 py-16 space-y-4">
          <i className="fa-solid fa-cart-shopping text-8xl text-gray-400 animate-[bounce_1s_ease-in-out_1.5]" />
          <h2 className="text-2xl font-semibold delay-100">ตะกร้าของคุณยังว่างเปล่า</h2>
          <Link href="/category">
            <span className="mt-4 px-6 py-2 bg-yellow-800 text-white rounded-xl hover:bg-yellow-700 transition-all duration-200">
              ไปหน้าสินค้า
            </span>
          </Link>
        </div>
      ) : (
        products.map((p, index) => (
          <div
            key={p.id}
            className="flex items-center justify-between bg-white rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={p.image}
                alt="product"
                className="w-20 h-20 object-cover rounded-xl border"
              />
              <div>
                <p className="font-semibold text-lg">{p.name}</p>
                <p className="text-gray-600">{p.price} Bath</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(index, -1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                −
              </button>
              <span className="min-w-[24px] text-center">{p.quantity}</span>
              <button
                onClick={() => updateQuantity(index, 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={() => deleteItemFromCart(p.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              ลบ
            </button>
          </div>
        ))
      )}
    </div>


 <div className="bg-[#FFE5BE] p-6 rounded-xl shadow h-fit ">
  <h2 className="text-xl font-bold mb-4">คำสั่งซื้อ</h2>
  <div className="space-y-2 text-lg">
    <div className="flex justify-between">
      <span>ยอดรวม:</span>
      <span className="font-semibold">{subTotal} บาท</span>
    </div>
    <div className="flex justify-between">
      <span>ค่าจัดส่ง:</span>
      <span className="font-semibold">{delivery} บาท</span>
    </div>
    <hr className="border-t-2 border-black" />
    <div className="flex justify-between font-bold text-lg">
      <span>ราคารวมทั้งหมด:</span>
      <span>{total} บาท</span>
    </div>
  </div>
  <button
    onClick={handleCheckout}
    className="mt-4 w-full bg-yellow-900 text-white py-2 rounded hover:bg-yellow-800"
  >
    ชำระเงินตอนนี้
  </button>
</div>
  </div>
</div> 
<Footer/>

    </>
  );
}