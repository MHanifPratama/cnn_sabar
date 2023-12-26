import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = () => {
  const chartOptions = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "line",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -26
      },
    },
    series: [
      {
        name: "Clicks",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: "#1A56DB",
      },
      {
        name: "CPC",
        data: [6456, 6356, 6526, 6332, 6418, 6500],
        color: "#7E3AF2",
      },
    ],
    legend: {
      show: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      {/* Displaying the stats */}
      <p class="text-gray-900 dark:text-white text-2xl mb-6 leading-none font-bold">Activity</p>
      
      {/* Render the chart */}
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="line"
        height="200"
        id="line-chart"
      />
      
      {/* View full report button */}
      {/* ... (the part you previously had for the view full report button) */}
    </div>
  );
};

export default LineChart;
