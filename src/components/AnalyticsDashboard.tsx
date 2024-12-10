import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import { loadAnalytics } from '../features/analyticsSlice';
import { AppDispatch } from '../store/store';

const AnalyticsDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { totalUsers, activeUsers, inactiveUsers, deletedUsers } = useSelector(
    (state: any) => state.analytics
  );
  const users = useSelector((state: any) => state.user.users);

  const [regionFilter, setRegionFilter] = useState('All');
  const [dateRangeFilter, setDateRangeFilter] = useState('Last 6 Months');

  useEffect(() => {
    dispatch(loadAnalytics(users));
  }, [dispatch, users]);

  // Mock region data
  const regionData = {
    series: [
      {
        name: 'Users',
        data: [20, 15, 30, 25, 10], // Mock data
      },
    ],
    options: {
      chart: {
        type: 'bar',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      colors: ['#4C98FF'],
      xaxis: {
        categories: ['North', 'South', 'East', 'West', 'Central'],
        labels: {
          style: {
            colors: '#333',
            fontSize: '14px',
          },
        },
      },
      title: {
        text: 'Users by Region',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#4C4C4C',
        },
      },
    },
  };

  // Pie Chart Data: Active vs Inactive Users
  const pieData = {
    series: [activeUsers, inactiveUsers],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Active Users', 'Inactive Users'],
      colors: ['#28A745', '#DC3545'],
      legend: {
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
          },
        },
      ],
    },
  };

  // Line Chart Data: User Registration Trend
  const lineData = {
    series: [
      {
        name: 'User Registrations',
        data: [5, 6, 3, 4, 8, 2], // Mock data
      },
    ],
    options: {
      chart: {
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: 3,
        curve: 'smooth',
      },
      colors: ['#FF8C00'],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: {
          style: {
            colors: '#333',
            fontSize: '14px',
          },
        },
      },
      title: {
        text: 'User Registration Trend (Last 6 Months)',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#4C4C4C',
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-[#2C3E50]">
        📊 Analytics Dashboard
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="p-3 border-2 rounded-lg w-full md:w-1/3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Regions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>

        <select
          value={dateRangeFilter}
          onChange={(e) => setDateRangeFilter(e.target.value)}
          className="p-3 border-2 rounded-lg w-full md:w-1/3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Last 6 Months">Last 6 Months</option>
          <option value="Last Year">Last Year</option>
          <option value="All Time">All Time</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: totalUsers, color: 'bg-blue-500' },
          { label: 'Active Users', value: activeUsers, color: 'bg-green-500' },
          { label: 'Inactive Users', value: inactiveUsers, color: 'bg-red-500' },
          { label: 'Deleted Users', value: deletedUsers || 0, color: 'bg-gray-500' },
        ].map((card, index) => (
          <div
            key={index}
            className={`${card.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 text-center`}
          >
            <h3 className="text-xl font-semibold mb-2">{card.label}</h3>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Chart options={pieData.options} series={pieData.series} type="pie" width="100%" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Chart options={lineData.options} series={lineData.series} type="line" width="100%" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
          <Chart options={regionData.options} series={regionData.series} type="bar" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
