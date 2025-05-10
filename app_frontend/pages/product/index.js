import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = localStorage.getItem('productId');
    const router = useRouter();
    const productApiUrl = process.env.NEXT_PUBLIC_USER_API_URL;

    useEffect(() => {
        if (id) {
            const fetchProducts = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${productApiUrl}/products/`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch products: ${response.status}`);
                    }
                    const products = await response.json();

                    const matchedProduct = products.find((product) => product.id === parseInt(id));
                    if (!matchedProduct) {
                        throw new Error('Product not found.');
                    }

                    setProduct(matchedProduct);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();
        }
    }, [id]);

    const addToBasket = async () => {

        try {
            const response = await fetch('${productApiUrl}/cart/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt_access')}`,
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                alert('Your session has expired. Please log in again.');
                localStorage.removeItem('jwt_access');
                router.push('/login');
                throw new Error(`Failed to add product to cart: ${response.status}`);
            }

            const data = await response.json();
            alert(`${product.name} has been added to your cart!`);
            console.log('Cart response:', data);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart. Please try again.');
        }
    };

    const buyNow = async () => {

        try {
            const response = await fetch('${productApiUrl}/orders/create/', {
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
                }),
            });

            if (!response.ok) {
                alert('Your session has expired. Please log in again.');
        localStorage.removeItem('jwt_access');
        router.push('/login');
                throw new Error(`Failed to create order: ${response.status}`);
            }

            const data = await response.json();
            alert('✅ Order created successfully!');
            localStorage.setItem('order_id', data.order_id);
            console.log('Order response:', data);

            router.push('/checkout');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-black">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">{error}</div>;
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-xl">Product not found.</div>;
    }

    return (
        <>
            <Header />
            <main>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 text-black items-center justify-center min-h-screen gap-8">
                    {/* Left: Product Image */}
                    <div className="grid place-items-center min-h-[300px]">
                        <img src={product.image} alt={product.name} className="w-full max-w-2xl h-auto" />
                    </div>

                    {/* Right: Product Details */}
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
                                Buy Now
                            </button>
                            <button
                                onClick={addToBasket}
                                className="bg-[#D89C42] text-white p-5 rounded hover:scale-105 duration-300"
                            >
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