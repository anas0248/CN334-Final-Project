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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [data, setData] = useState({
    orders: 0,
    products: 0,
    users: 0,
    monthlyIncome: {},
    categoryDistribution: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = {
        orders: 100,
        products: 300,
        users: 50,
        monthlyIncome: {
          Jan: 112,
          Feb: 10,
          Mar: 225,
          Apr: 134,
          May: 101,
          Jun: 80,
          Jul: 50,
          Aug: 100,
          Sep: 200
        },
        categoryDistribution: {
          'จักสาน': 30,
          'สิ่งทอ': 20,
          'เครื่องประดับ': 15,
          'เครื่องปั้นดินเผา': 10,
          'กะลามะพร้าว': 5,
          'หัตถกรรมไม้': 10,
          'สมุนไพรเครื่องหอม': 10
        }
      };

      setData(result);
    };

    fetchData();
  }, []);

  // สร้าง bar chart จาก data.monthlyIncome
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

  // สร้าง pie chart จาก data.categoryDistribution
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
    </>
  );
}
