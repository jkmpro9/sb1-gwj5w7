import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [data, setData] = useState({ totalInvoices: 0, totalCustomers: 0, totalRevenue: 0 });

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        // Simulating an API call
        const response = await new Promise(resolve => setTimeout(() => resolve({
          totalInvoices: 10,
          totalCustomers: 5,
          totalRevenue: 1000
        }), 1000));

        if (isMounted) {
          setData(response as typeof data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome to the COCCINELLE SARL Invoice Generator dashboard.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Invoices</h2>
          <p className="text-3xl font-bold">{data.totalInvoices}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
          <p className="text-3xl font-bold">{data.totalCustomers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">${data.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;