// pages/basket.js
import Header from '@/components/Header';
import { useState } from 'react';


const initialProducts = Array(5).fill({
  id: Math.random(),
  name: 'ต่างหูแก้วคริสตัล',
  price: 399,
  quantity: 1,
  image: './5-Photoroom.png',
});

export default function Basket() {
  const [products, setProducts] = useState(initialProducts);

  const updateQuantity = (index, delta) => {
    const updated = [...products];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    setProducts(updated);
  };

  const deleteProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const subTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const delivery = 50;
  const total = subTotal + delivery;

  return (
    <>
    <Header></Header>
    <div className="bg-orange-50 min-h-screen p-8 mt-10 text-black">
      <h1 className="text-4xl font-bold mb-6">Basket</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {products.map((p, index) => (
            <div key={p.id} className="flex items-center justify-between bg-white rounded-xl p-4 shadow">
              <div className="flex items-center space-x-4">
                <img src={p.image} alt="product" className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-gray-600">{p.price} Bath</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(index, -1)} className="px-2 bg-gray-200 rounded">−</button>
                <span>{p.quantity}</span>
                <button onClick={() => updateQuantity(index, 1)} className="px-2 bg-gray-200 rounded">+</button>
              </div>

              <button onClick={() => deleteProduct(index)} className="bg-red-500 text-white px-4 py-1 rounded">
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="bg-[#FFE5BE] p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Order</h2>
          <div className="space-y-2 text-lg">
            <div className="flex justify-between">
              <span>Sub Total:</span> <span className="font-semibold">{subTotal} Bath</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery fee:</span> <span className="font-semibold">{delivery} Bath</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Price:</span> <span>{total} Bath</span>
            </div>
          </div>
          <button className="mt-4 w-full bg-yellow-900 text-white py-2 rounded hover:bg-yellow-800">
            Check out Now
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
