import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function OrdersByProduct() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { id } = router.query
  const productApiUrl = process.env.NEXT_PUBLIC_USER_API_URL
  
  useEffect(() => {
    if (!id) return

    const token = localStorage.getItem("jwt_access")
    console.log("Fetching orders for product:", id)

    fetch(`${productApiUrl}/order/byProductId/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      if (res.status === 401) {
        setError("Unauthorized. Please log in again.")
        return
      }
      if (res.status === 404) {
        setError("No orders found for this product")
        return
      }
      if (!res.ok) throw new Error("Failed to fetch orders")
      return res.json()
    })
    .then((data) => {
        console.log("Response data:", data)
        setOrders(data)
    //   if (data?.data) {
    //     console.log('1')
    //     setOrders(data)
    //   } else {
    //     console.log('2')
    //     setError("No orders available")
    //   }
    })
    .catch((err) => {
      console.error("Fetch error:", err)
      setError(err.message)
    })
    .finally(() => setLoading(false))
  }, [id])

  if (error) return (
    <div className="p-8 text-center text-red-500">
      {error} <br/>
      <button 
        className="mt-4 text-blue-500 hover:underline"
        onClick={() => router.back()}
      >
        Go back
      </button>
    </div>
  )

  if (loading) return (
    <div className="p-8 text-center text-gray-500">
      Loading orders...
    </div>
  )

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Orders for Product #{id}
          </h1>
          <Link 
            href="/product/all"
            className="text-blue-500 hover:underline"
          >
            ← Back to Products
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No orders found for this product
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div 
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold text-black">
                    Order #{order.id}
                  </h2>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <p>Customer: {order.customer?.username || 'N/A'}</p>
                    <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold">Total Price:</p>
                    <p>${order.total_price}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Status:</p>
                    <span className={`px-2 py-1 rounded ${
                      order.status === 'delivered' 
                        ? 'bg-green-100 text-black' 
                        : 'bg-yellow-100 text-black'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Shipping Address:</p>
                  <p className="text-gray-600 whitespace-pre-line">
                    {order.shipping_address}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Payment Method:</p>
                  <p className="text-gray-600">{order.payment_method}</p>
                </div>

                <div>
                  <p className="font-semibold mb-4">Order Items:</p>
                  <div className="space-y-2">
                    {order.items?.map(item => (
                      <div 
                        key={item.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="font-medium">{item.product?.name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="text-gray-600">
                          ${item.price_at_purchase}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}