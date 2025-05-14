import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, use } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loading from "@/components/Loading";
import Swal from 'sweetalert2';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const userApiUrl = process.env.NEXT_PUBLIC_USER_API_URL;
  const productApiUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;


  const fetchAllProducts = async () => {
    const token = localStorage.getItem("jwt_access");
    if (!token) {
    await Swal.fire({
        title: 'เซสชันหมดอายุ',
        text: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
      router.push('/login');
      throw new Error("Authentication required: Please log in.");
    }

    try {
      // Fetch all products
      const response = await fetch(`${productApiUrl}/products/`, {
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
        await Swal.fire({
          title: 'เซสชันหมดอายุ',
          text: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
          icon: 'warning',
          confirmButtonText: 'ตกลง'
        });
        setError("Authentication required: Please log in.");
        setLoading(false);
        router.push('/login');
      }

      try {
        // Fetch profile data
        const profileResponse = await fetch(`${userApiUrl}/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!profileResponse.ok) {
          Swal.fire({
            title: 'เซสชันหมดอายุ',
            text: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
            icon: 'warning',
            confirmButtonText: 'ตกลง'
          });
          localStorage.removeItem("jwt_access");
          router.push('/login');
          throw new Error(`Profile fetch failed: ${profileResponse.status}`);
        }
        const profileData = await profileResponse.json();

        // Fetch customer data
        const customerResponse = await fetch(`${userApiUrl}/customer/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!customerResponse.ok) {
          throw new Error(`Customer fetch failed: ${customerResponse.status}`);
        }
        const customerData = await customerResponse.json();
        console.log("Customer data:", customerData);
        // Combine profile and customer data
        const combinedUser = {
          ...profileData,
          ...customerData,
        };
        setUser(combinedUser);

        // Fetch orders
        const ordersResponse = await fetch(`${productApiUrl}:3341/orders/my/`, {
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
              `${productApiUrl}/shipping/${order.id}/`,
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

  // Edit
  const [showModal, setShowModal] = useState(false);
  const [showModalAddress, setShowModalAddress] = useState(false);

  const [formDatAddress, setFormDatAddress] = useState({
    user: '',
    address: '',
    province: '',
    post_code: '',
    phone_number: '',
  });


  const [formDataAccount, setFormDatAccount] = useState({
    username: '',
    full_name: '',
    first_name: '',
    last_name: '',
    email: '',
  });


  useEffect(() => {
    if (user) {
      setFormDatAddress({
        user: user.user,
        full_name: user.full_name || '',
        address: user.address || '',
        province: user.province || '',
        post_code: user.post_code || '',
        phone_number: user.phone_number || '',
      });

      setFormDatAccount({
        username: user.username || '',
        first_name: user.firstName || '',
        last_name: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleSaveAddress = async () => {
    try {
      console.log('Form data:', user.user);
      console.log('Form data:', formDatAddress);
      const response = await fetch(`${userApiUrl}/customer_update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("jwt_access")}`,
        },
        body: JSON.stringify(formDatAddress),
      });
      console.log('Response:', response.json());
      if (response.ok) {
       await Swal.fire({
          icon: 'success',
          title: 'อัปเดตที่อยู่เรียบร้อยแล้ว',
          confirmButtonText: 'ตกลง',
        })
        window.location.reload();
      }
      setShowModalAddress(false);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };


  const handleSaveAccount = async () => {
    try {
      const response = await fetch(`${userApiUrl}/userprofile_update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("jwt_access")}`,
        },
        body: JSON.stringify(formDataAccount),
      });
      console.log('Response:', response.json());
      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'อัปเดตบัญชีเรียบร้อยแล้ว',
          confirmButtonText: 'ตกลง',
        })
        window.location.reload();
      }
      setShowModalAddress(false);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };



  if (loading) {
    return (
      <Loading />
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
      <main className="min-h-screen bg-[#fdf6ec] mt-10">
        <div className="flex flex-col h-full">
          {/* My Account + Address Book */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-20 mt-8 sm:mt-10 max-w-7xl mx-auto">
            {/* My Account */}
            <div className="bg-white rounded-xl shadow-md pb-4 sm:pb-5 flex">
              <div className="justify-between">
                <h2 className="text-center text-[#754600] font-bold text-2xl md:text-3xl mt-4 sm:mt-5 item-center">My Account</h2>
                <div className="text-[#754600] text-lg md:text-xl mx-4 sm:mx-6 mt-4 sm:mt-5 space-y-2">
                  <div className="flex gap-2 sm:gap-3 min-w-4">
                    <span className="font-medium min-w-[120px] ">Username:</span>
                    <span>{user.username}</span>
                  </div>
                  <div className="flex gap-2 sm:gap-3 min-w-4">
                    <span className="font-medium min-w-[120px]">Full Name:</span>
                    <span>{user.full_name}</span>
                  </div>
                  <div className="flex gap-2 sm:gap-3 min-w-4">
                    <span className="font-medium min-w-[120px]">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex gap-2 sm:gap-3 min-w-4">
                    <span className="font-medium min-w-[120px]">Phone:</span>
                    <span>{user.phone_number || user.tel || 'N/A'}</span>
                  </div>
                </div>
              </div>
                           {/* Button to open the modal */}
                            <button
                                onClick={() => setShowModal(true)}
                                className="ml-auto mt-4 mr-4 p-2 rounded-full  text-yellow-700 "
                                type="button"
                            >
                                <i className="fa-solid fa-pen-to-square text-xl hover:text-yellow-800 hover:translate-y-[-5px] transition-transform duration-300"></i>
                            </button>


              {/* Modal */}
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                      <h3 className="text-lg  text-black font-semibold">Edit Account</h3>
                      <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
                        &times;
                      </button>
                    </div>

                    {/* Modal Body */}
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium min-w-[120px] text-gray-700">User Name</label>
                        <input className=" text-black w-full border rounded px-3 text-black py-2 mt-1"
                          type="text"
                          value={formDataAccount.username}
                          onChange={(e) => setFormDatAccount({ ...formDataAccount, username: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium min-w-[120px] text-gray-700">Full Name</label>
                        <input
                          type="text"
                          className="text-black w-full border rounded px-3 py-2 mt-1"
                          placeholder="Firstname Lastname"
                          value={`${formDataAccount.first_name} ${formDataAccount.last_name}`} //รวม first_name และ last_name
                          onChange={(e) => {
                            const [first_name, ...last_name_parts] = e.target.value.split(' '); //แยกข้อความด้วย
                            const last_name = last_name_parts.join(' ');
                            setFormDatAccount({
                              ...formDataAccount,
                              first_name: first_name || '', //first_name
                              last_name: last_name || '', //last_name
                            });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium min-w-[120px] text-gray-700">Email</label>
                        <input type="email" className=" text-black w-full border rounded px-3 text-black py-2 mt-1" placeholder="you@example.com"
                          value={formDataAccount.email}
                          onChange={(e) => setFormDatAccount({ ...formDataAccount, email: e.target.value })} />
                      </div>
                    </form>

                    {/* Modal Footer */}
                    <div className="flex justify-end mt-6 space-x-2">
                      <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                      </button>
                      <button onClick={handleSaveAccount} className="px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-700">
                        Save
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Address Book */}
                        <div className="bg-white rounded-xl shadow-md pb-4 sm:pb-5 flex">
                            <div className="">
                                <h2 className="text-center text-[#754600] font-bold text-2xl md:text-3xl mt-4 sm:mt-5">Address Book</h2>
                                <div className="text-[#754600] mx-4 sm:mx-6 mt-4 sm:mt-5 text-lg md:text-xl space-y-2">
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium w-32">Address:</span>
                                        <span>{user.address}</span>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium w-32">Province:</span>
                                        <span>{user.province}</span>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium w-32">Postal Code:</span>
                                        <span>{user.post_code}</span>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3">
                                        <span className="font-medium w-32">Phone:</span>
                                        <span>{user.phone_number || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Button to open the modal */}
                            <button
                                onClick={() => setShowModalAddress(true)}
                                className="ml-auto mt-4 mr-4 p-2 rounded-full  text-yellow-700 "
                                type="button"
                            >
                                <i className="fa-solid fa-pen-to-square text-xl hover:text-yellow-800 hover:translate-y-[-5px] transition-transform duration-300"></i>
                            </button>

              {/* Modal */}
              {showModalAddress && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                      <h3 className="text-lg text-black  font-semibold">Edit Address Book</h3>
                      <button onClick={() => setShowModalAddress(false)} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
                        &times;
                      </button>
                    </div>

                    {/* Modal Body */}
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium min-w-[120px] text-gray-700">Address</label>
                        <input type="text" className="w-full border rounded px-3 text-black py-2 mt-1" placeholder=""
                          value={formDatAddress.address}
                          onChange={(e) => setFormDatAddress({ ...formDatAddress, address: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium min-w-[120px] text-gray-700">Province</label>
                        <input type="text" className="w-full border rounded px-3 text-black py-2 mt-1" placeholder=""
                          value={formDatAddress.province}
                          onChange={(e) => setFormDatAddress({ ...formDatAddress, province: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium min-w-[120px] text-gray-700">Post code</label>
                        <input type="text" className="w-full border rounded px-3 text-black py-2 mt-1" placeholder=""
                          value={formDatAddress.post_code}
                          onChange={(e) => setFormDatAddress({ ...formDatAddress, post_code: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium min-w-[120px] text-gray-700">Phone Number</label>
                        <input type="text" className="w-full border rounded px-3 text-black py-2 mt-1" placeholder=""
                          value={formDatAddress.phone_number}
                          onChange={(e) => setFormDatAddress({ ...formDatAddress, phone_number: e.target.value })} />
                      </div>
                    </form>

                    {/* Modal Footer */}
                    <div className="flex justify-end mt-6 space-x-2">
                      <button onClick={() => setShowModalAddress(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                      </button>
                      <button onClick={handleSaveAddress} className="px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-700">
                        Save
                      </button>
                    </div>

                  </div>
                </div>
              )}
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
                    <th className="px-4 py-2 text-left border-b border-gray-200">Receiver Name</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {orders.map((order, idx) => {
                    // console.log('Anas1', order);
                    if (!order.shipping) {
                      return null;
                    }
                    return order.items.map((item, itemIdx) => (
                      // console.log('Anas2', item),
                      <tr key={`${idx}-${itemIdx}`} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-2 border-b border-gray-200">{order.id}</td>
                        <td className="px-4 py-2 border-b border-gray-200">{item.product_name}</td>
                        <td className="px-4 py-2 border-b border-gray-200">฿{item.price_at_order_time}</td>
                        <td className="px-4 py-2 border-b border-gray-200">{item.quantity}</td>
                        <td className="px-4 py-2 border-b border-gray-200">฿{item.price_at_order_time * item.quantity}</td>
                        <td
                          className={`px-4 py-2 font-medium min-w-[120px] border-b border-gray-200 ${order.shipping.status === "จัดส่งแล้ว" ? "text-green-600" : "text-yellow-600"
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