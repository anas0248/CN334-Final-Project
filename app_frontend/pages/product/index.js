import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Swal from 'sweetalert2';

export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState(null); // ✅ ใช้ useState แทนการอ่าน localStorage ทันที
    const router = useRouter();
    const productApiUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedId = localStorage.getItem('productId');
            if (storedId) {
                setId(storedId);
            } else {
                setError("ไม่พบรหัสสินค้าใน localStorage");
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        if (!id) return;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${productApiUrl}/products/`);
                if (!response.ok) {
                    throw new Error(`ไม่สามารถดึงข้อมูลสินค้าได้: ${response.status}`);
                }

                const products = await response.json();
                const matchedProduct = products.find((product) => product.id === parseInt(id));

                if (!matchedProduct) {
                    throw new Error('ไม่พบสินค้า');
                }

                setProduct(matchedProduct);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id, productApiUrl]);

    const addToBasket = async () => {
        try {
            const token = localStorage.getItem('jwt_access');
            if (!token) throw new Error('กรุณาเข้าสู่ระบบ');

            const response = await fetch(`${productApiUrl}/cart/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                Swal.fire({
                    title: 'เซสชันหมดอายุ',
                    text: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
                    icon: 'warning',
                    confirmButtonText: 'ตกลง',
                });
                localStorage.removeItem('jwt_access');
                router.push('/login');
                return;
            }

            const data = await response.json();
            Swal.fire({
                title: 'สำเร็จ!',
                text: `${product.name} ถูกเพิ่มในตะกร้าเรียบร้อยแล้ว!`,
                icon: 'success',
                confirmButtonText: 'ตกลง',
            });
            console.log('Cart response:', data);
        } catch (error) {
            console.error('Error adding to cart:', error);
            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: error.message || 'ไม่สามารถเพิ่มสินค้าได้ กรุณาลองใหม่',
                icon: 'error',
                confirmButtonText: 'ตกลง',
            });
        }
    };
    const buyNow = async () => {
        try {
            const response = await fetch(`${productApiUrl}/orders/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt_access')}`,
                },
                body: JSON.stringify({
                    items_write: [
                        {
                            product: product.id,
                            quantity: 1,
                        },
                    ],
                    total_price: product.price,
                    shipping_address: "",
                    phone_number: "",
                }),
            });

            if (!response.ok) {
                Swal.fire({
                    title: 'เซสชันหมดอายุ',
                    text: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
                    icon: 'warning',
                    confirmButtonText: 'ตกลง',
                });
                localStorage.removeItem('jwt_access');
                router.push('/login');
                throw new Error(`ไม่สามารถสร้างคำสั่งซื้อได้: ${response.status}`);
            }

            const data = await response.json();
            Swal.fire({
                title: 'สร้างคำสั่งซื้อสำเร็จ!',
                text: 'คำสั่งซื้อถูกสร้างเรียบร้อยแล้ว!',
                icon: 'success',
                confirmButtonText: 'ไปที่หน้าชำระเงิน',
            }).then(() => {
                localStorage.setItem('order_id', data.order_id);
                router.push('/checkout');
            });
            console.log('Order response:', data);
        } catch (error) {
            console.error('Error creating order:', error);
            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถสร้างคำสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง',
                icon: 'error',
                confirmButtonText: 'ตกลง',
            });
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-black">กำลังโหลด...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">{error}</div>;
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-xl">ไม่พบสินค้า</div>;
    }

    return (
        <>
            <Header />
            <main>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 text-black items-center justify-center min-h-screen gap-8">

                    <div className="grid place-items-center min-h-[300px]">
                        <img src={product.image} alt={product.name} className="w-full max-w-2xl h-auto" />
                    </div>

    
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
                            <button
                                onClick={buyNow}
                                className="bg-[#754600] text-white p-5 rounded hover:scale-105 duration-300"
                            >
                                ซื้อเลย
                            </button>
                            <button
                                onClick={addToBasket}
                                className="bg-[#D89C42] text-white p-5 rounded hover:scale-105 duration-300"
                            >
                                เพิ่มในตะกร้า
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}