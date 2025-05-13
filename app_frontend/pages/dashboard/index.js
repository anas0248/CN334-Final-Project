import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import Footer from '@/components/Footer';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const productApiUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;
  const userApiUrl = process.env.NEXT_PUBLIC_USER_API_URL;
  
  const [data, setData] = useState({
    orders: 0,
    products: 0,
    users: 0,
    monthlyIncome: {},
    categoryDistribution: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwt_access');
      if (!token) {
        alert('You must be logged in to view the dashboard.');
        router.push('/login');
        return;
      }

      try {
        const usersResponse = await fetch(`${userApiUrl}/allcustomers/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (usersResponse.status === 401) {
          alert('Your session has expired. Please log in again.');
          localStorage.removeItem('jwt_access');
          router.push('/login');
          return;
        }

        if (usersResponse.status === 403) {
          alert('You do not have permission to access this resource.');
          window.location.href = '/Home';
          return;
        }

        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users data');
        }

        const usersResult = await usersResponse.json();
        console.log('user', usersResult.length);

        const productsResponse = await fetch(`${productApiUrl}/products/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (productsResponse.status === 401) {
          alert('Your session has expired. Please log in again.');
          localStorage.removeItem('jwt_access');
          router.push('/login');
          return;
        }

        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products data');
        }

        const productsResult = await productsResponse.json();
        console.log('product', productsResult.length);

        const categoryDistribution = productsResult.reduce((acc, product) => {
          const category = product.category || 'Uncategorized'; // Default to 'Uncategorized' if no category
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        console.log('Category Distribution:', categoryDistribution);

        const ordersResponse = await fetch(`${productApiUrl}/allorders/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (ordersResponse.status === 401) {
          alert('Your session has expired. Please log in again.');
          localStorage.removeItem('jwt_access');
          router.push('/login');
          return;
        }

        if (!ordersResponse.ok) {
          throw new Error('Failed to fetch products data');
        }

        const ordersResult = await ordersResponse.json();
        console.log('order', ordersResult);

        const totalIncomeByMonth = ordersResult.reduce((acc, order) => {
          if (order.status === 'paid' || order.status === 'completed') {
            const orderDate = new Date(order.order_date); 
            const month = orderDate.toLocaleString('default', { month: 'short' }); 
            acc[month] = (acc[month] || 0) + parseFloat(order.total_price); 
            
          }
          console.log('order', acc);
          return acc;
        }, {});

        console.log('Total Income:', totalIncomeByMonth);


        setData({
          orders: ordersResult.length,
          products: productsResult.length,
          users: usersResult.length,
          monthlyIncome: totalIncomeByMonth,
          categoryDistribution: categoryDistribution,
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-red-500">
        {error}
      </div>
    );
  }

  const barLabels = Object.keys(data.monthlyIncome);
  const barValues = Object.values(data.monthlyIncome);

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: 'Total Income',
        data: barValues,
        backgroundColor: '#4E2F00',
        borderColor: '#4E2F00',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Income' },
    },
  };

  const pieLabels = Object.keys(data.categoryDistribution);
  const pieValues = Object.values(data.categoryDistribution);

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        label: 'Categories Distribution',
        data: pieValues,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(201, 203, 207, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Category Distribution',
      },
    },
  };

  return (
    <>
      <Header />
      <main className="h-screen justify-center items-center">
        <div className="max-w-8xl p-4 mt-20">
          <div className="grid grid-cols-4 gap-10">
            {/* First column */}
            <div className="col-span-1 grid grid-rows-4 gap-10 ">
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                <h3 className="text-3xl text-yellow-600">Total Orders</h3>
                <h4 className="text-6xl text-yellow-600 self-end">{data.orders}</h4>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                <h3 className="text-3xl  text-yellow-600">Total Product</h3>
                <h4 className="text-6xl text-yellow-600 self-end">{data.products}</h4>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between ">
                <h3 className="text-3xl text-yellow-600">Total Users</h3>
                <h4 className="text-6xl text-yellow-600 self-end">{data.users}</h4>
              </div>
            </div>

            {/* Second column */}
            <div className="col-span-3 grid grid-rows-2 gap-10 ">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-4xl text-yellow-600  ">Total Income</h3>
                <div style={{ width: '100%', height: '300px' }}>
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-4xl text-yellow-600">All Category</h3>
                <div style={{ width: '100%', height: '300px' }}>
                  <Pie data={pieData} options={{ ...pieOptions, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}