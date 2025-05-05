import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchAllProducts = async () => {
    const token = localStorage.getItem("jwt_access");
    if (!token) {
      router.push('/login');
      alert("Your session has expired. Please log in again.");
      throw new Error("Authentication required: Please log in.");
    }

    try {
      // Fetch all products
      const response = await fetch(`http://127.0.0.1:3341/products/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Products fetch failed: ${response.status}`);
      }

      const products = await response.json();
      console.log("All products:", products);
      return products;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("jwt_access");
      if (!token) {
        setError("Authentication required: Please log in.");
        setLoading(false);
        router.push('/login');
      }

      try {
        // Fetch profile data
        const profileResponse = await fetch(`http://127.0.0.1:3342/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!profileResponse.ok) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("jwt_access");
          router.push('/login');
          throw new Error(`Profile fetch failed: ${profileResponse.status}`);
        }
        const profileData = await profileResponse.json();

        // Fetch customer data
        const customerResponse = await fetch(`http://127.0.0.1:3342/customer/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!customerResponse.ok) {
          throw new Error(`Customer fetch failed: ${customerResponse.status}`);
        }
        const customerData = await customerResponse.json();

        // Combine profile and customer data
        const combinedUser = {
          ...profileData,
          ...customerData,
        };
        setUser(combinedUser);

        // Fetch orders
        const ordersResponse = await fetch("http://127.0.0.1:3341/orders/my/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!ordersResponse.ok) {
          throw new Error(`Orders fetch failed: ${ordersResponse.status}`);
        }
        const ordersData = await ordersResponse.json();

        // Fetch all products
        const productsData = await fetchAllProducts();

        // Map orders with product and shipping details
        const ordersWithDetails = await Promise.all(
          ordersData.map(async (order) => {
            // Fetch shipping data for the order
            const shippingResponse = await fetch(
              `http://127.0.0.1:3341/shipping/${order.id}/`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const shippingData =
              shippingResponse.ok && shippingResponse.status !== 404
                ? await shippingResponse.json()
                : null;

            // Map order items with product details
            const itemsWithProductDetails = order.items.map((item) => {
              const product = productsData.find(
                (product) => product.id === item.product
              );
              return {
                ...item,
                product_name: product ? product.name : "Unknown Product",
              };
            });

            return {
              ...order,
              shipping: shippingData, // Add shipping data to the order
              items: itemsWithProductDetails,
            };
          })
        );

        console.log("Orders with product and shipping details:", ordersWithDetails);
        setOrders(ordersWithDetails);
        setLoading(false);  
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-gray-700">Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-gray-700">No user data found.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fdf6ec]">
        <div className="flex flex-col h-full">
          {/* My Account + Address Book */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 sm:mt-10 max-w-7xl mx-auto">
            {/* My Account */}
            <div className="bg-white rounded-xl shadow-md pb-4 sm:pb-5">
              <h2 className="text-center text-[#754600] font-bold text-2xl md:text-3xl mt-4 sm:mt-5">My Account</h2>
              <div className="text-[#754600] text-lg md:text-xl mx-4 sm:mx-6 mt-4 sm:mt-5 space-y-2">
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-medium">Username:</span>
                  <span>{user.username}</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-medium">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-medium">Phone:</span>
                  <span>{user.phone_number || user.tel || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Address Book */}
            <div className="bg-white rounded-xl shadow-md pb-4 sm:pb-5">
              <h2 className="text-center text-[#754600] font-bold text-2xl md:text-3xl mt-4 sm:mt-5">Address Book</h2>
              <div className="text-[#754600] mx-4 sm:mx-6 mt-4 sm:mt-5 text-lg md:text-xl space-y-2">
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-medium">Full Name:</span>
                  <span>{user.full_name}</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-medium">Address:</span>
                  <span>{user.address}</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-medium">Province:</span>
                  <span>{user.province}</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-medium">Postal Code:</span>
                  <span>{user.post_code}</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-medium">Phone:</span>
                  <span>{user.phone_number || user.tel || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center sm:text-left">Order History</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm md:text-base text-gray-800 divide-y divide-gray-200 border-collapse border border-gray-200">
                <thead className="bg-[#FFE5BE]">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-200">Order ID</th>
                    <th className="px-4 py-2 text-left border-b border-gray-200">Product</th>
                    <th className="px-4 py-2 text-left border-b border-gray-200">Price</th>
                    <th className="px-4 py-2 text-left border-b border-gray-200">Quantity</th>
                    <th className="px-4 py-2 text-left border-b border-gray-200">Total</th>
                    <th className="px-4 py-2 text-left border-b border-gray-200">Status</th>
                    <th className="px-4 py-2 text-left border-b border-gray-200">Tracking Number</th>
                    <th className="px-4 py-2 text-left border-b border-gray-200">Courier Name</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {orders.map((order, idx) => {
                    console.log('Anas1', order);
                    if (!order.shipping) {
                      return null;
                    }
                    return order.items.map((item, itemIdx) => (
                      console.log('Anas2', item),
                      <tr key={`${idx}-${itemIdx}`} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-2 border-b border-gray-200">{order.id}</td>
                        <td className="px-4 py-2 border-b border-gray-200">{item.product_name}</td>
                        <td className="px-4 py-2 border-b border-gray-200">฿{item.price_at_order_time}</td>
                        <td className="px-4 py-2 border-b border-gray-200">{item.quantity}</td>
                        <td className="px-4 py-2 border-b border-gray-200">฿{item.price_at_order_time * item.quantity}</td>
                        <td
                          className={`px-4 py-2 font-medium border-b border-gray-200 ${order.shipping.status === "จัดส่งแล้ว" ? "text-green-600" : "text-yellow-600"
                            }`}
                        >
                          {order.shipping.status}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200">{order.shipping.tracking_number || "N/A"}</td>
                        <td className="px-4 py-2 border-b border-gray-200">{order.shipping.courier_name || "N/A"}</td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

