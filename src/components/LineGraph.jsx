// src/components/LineGraph.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ pastValues, dateLabel, label, type }) => {
  // Extract the time from the timestamp field (e.g., "24/09/2024 12:02:31")
  const labels = pastValues.map(item => {
    const timestamp = item.timestamp;
    const time = timestamp.split(' ')[1];  // Extract "12:02:31" part
    return time;
  });

  const data = {
    labels: labels,  // X-axis is the time part of the timestamp
    datasets: [
      {
        label: label,
        data: pastValues.map(item => item[type]),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Data: ${dateLabel}`,  // Use the date as the graph label
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
