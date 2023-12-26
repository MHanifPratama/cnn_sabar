import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const PieChart = ({ op1, op2, op3, op4 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const total = op1 + op2 + op3 + op4;

    const getChartOptions = () => {
      return {
        series: [op1 / total * 100, op2 / total * 100, op3 / total * 100, op4 / total * 100],
        colors: ["#1C64F2", "#16BDCA", "#9061F9", "#FF7F50"],
        chart: {
          height: 250,
          type: "pie",
        },
        labels: ["Mahasiswa", "Dosen", "Matkul", "Ruangan"],
        legend: {
          position: "bottom",
        },
      };
    };

    if (chartRef.current && typeof ApexCharts !== 'undefined' && op1 !== null && op2 !== null && op3 !== null && op4 !== null) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      chartInstance.current = new ApexCharts(chartRef.current, getChartOptions());
      chartInstance.current.render();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [op1, op2, op3, op4]);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="py-6" ref={chartRef}></div>
    </div>
  );
};

export default PieChart;
