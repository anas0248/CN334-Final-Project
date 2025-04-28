import { useState, useEffect } from 'react';

export default function ProductList() {
    const [products, setProducts] = useState(null);
    const [productList, setProductList] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt_access");
        console.log(token);
        fetch(`http://127.0.0.1:3341/products/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.data) {
                    setProducts(data);
                    const listItems = data.data.map((product, index) => (
                        <li key={index}>
                            <strong>{product.name}</strong>: {product.description} - ${product.price}
                        </li>
                    ));
                    setProductList(listItems);
                } else {
                    setProducts(null);
                    setProductList([]);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch products:", err);
                setProducts(null);
                setProductList([]);
            });
    }, []);

    if (!products) return <p>No product data</p>;
    else return (
        <main
            className='flex min-h-screen flex-col items-center justify-between'
        >
            <div style={{ fontSize: "64px" }}
                className="w-full flex flex-col justify-center items-center dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                <div>Product List</div>
                <div>
                    <ul>
                        {productList}
                    </ul>
                </div>
            </div>
        </main>
    );
}