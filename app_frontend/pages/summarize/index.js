import { useState, useEffect } from 'react'

export default function SummaryPage() {
    const [summary, setSummary] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totaltotalCustomers: 0
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                const token = localStorage.getItem("jwt_access")

                const [customerRes, productRes] = await Promise.all([
                    fetch('http://127.0.0.1:3342/summarize/', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch('http://127.0.0.1:3341/summarize/', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ])

                if (!customerRes.ok) throw new Error('Failed to fetch customer data')
                if (!productRes.ok) throw new Error('Failed to fetch product data')

                const customerData = await customerRes.json()
                const productData = await productRes.json()
                console.log("Customer Data:", customerData)
                setSummary({
                    totaltotalCustomers: customerData.total_customers || 0,
                    totalProducts: productData.total_products || 0,
                    totalOrders: productData.total_orders || 0
                })

            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchSummaryData()
    }, [])

    if (error) return (
        <div className="p-8 text-center text-red-500">
            <p>Error: {error}</p>
            <button
                className="mt-4 text-blue-500 hover:underline"
                onClick={() => window.location.reload()}
            >
                Try Again
            </button>
        </div>
    )

    if (loading) return (
        <div className="p-8 text-center text-gray-500">
            Loading summary data...
        </div>
    )

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">System Summary</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Users Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold mb-2 text-black">total Customers</h2>
                        <p className="text-4xl font-bold text-blue-600">
                            {summary.totaltotalCustomers.toLocaleString()}
                        </p>
                    </div>

                    {/* Products Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold mb-2 text-black">Total Products</h2>
                        <p className="text-4xl font-bold text-green-600">
                            {summary.totalProducts.toLocaleString()}
                        </p>
                    </div>

                    {/* Orders Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold mb-2 text-black">Total Orders</h2>
                        <p className="text-4xl font-bold text-purple-600">
                            {summary.totalOrders.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Additional Info (Optional) */}
                <div className="mt-8 text-gray-500 text-center">
                    <p>Data fetched from multiple services</p>
                    <p>Updated in real-time</p>
                </div>
            </div>
        </main>
    )
}