import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axiosInstance from "../../config/axios";
import { FormatMoneyUSD } from "../../services/FormatMoney";
import { Spin } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const year = new Date().getFullYear();
const currentMonth = new Date().getMonth(); // Mes actual (0 - 11)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Gastos por Día",
    },
  },
  scales: {
    x: {
      // Configuración adicional para el eje X si es necesario
    },
    y: {
      ticks: {
        callback: function (value: any) {
          return FormatMoneyUSD(value, true); // Añade el signo de dólar y formato a dos decimales
        },
      },
    },
  },
};

export const GastosChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("dashboard/gastos");
        const gastosData = response.data.gastos;

        const labels = gastosData.map((item: any) => item.day);
        const data = gastosData.map((item: any) => item.total);

        setChartData({
          labels,
          datasets: [
            {
              label: "Gastos",
              data,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin />;
  }

  return <Bar options={options} data={chartData} />;
};
