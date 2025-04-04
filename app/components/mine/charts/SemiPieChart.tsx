// components/charts/SemiPieChart.tsx (or .jsx)
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

// IMPORTANT: Register required chart elements
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function SemiPieChart({ data }) {
  // Transform data into Chart.js format
  // Example: data is an array of city rows with name & sales
  const chartData = {
    labels: data.map(item => item["blinkit_insights_city.name"]),
    datasets: [
      {
        data: data.map(item => item["blinkit_insights_city.sales_mrp_sum"]),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          // ... add more colors if needed
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for a half-pie (semi-donut) chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Top Cities Sales',
      },
      legend: {
        position: 'bottom',
      },
    },
    rotation: -90,    // start angle in degrees
    circumference: 180, // sweep angle in degrees (half circle)
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
}
