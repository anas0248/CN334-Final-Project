import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;

        const token = localStorage.getItem("jwt_access");
        console.log(token);
        console.log(id);
        if (!token) {
            console.log("No token found. Please log in.");
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
                if (!res.ok) {
                    throw new Error("Failed to fetch product.");
                }
                return res.json();
            })
            .then((data) => {
                if (data && data.data) {
                    setProduct(data.data);
                } else {
                    setProduct(null);
                }
            })
            .catch((err) => {
                console.error(err.message);
                setError(err.message);
                setProduct(null);
            });
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!product) return <p>Loading product data...</p>;

    return (
        <main
            className='flex min-h-screen flex-col items-center justify-between'
        >
            <div style={{ fontSize: "64px" }}
                className="w-full flex flex-col justify-center items-center dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                <div>Product Details</div>
                <div>
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                </div>
            </div>
        </main>
    );
}