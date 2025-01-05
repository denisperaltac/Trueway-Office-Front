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
import { BaseUrl } from "../../config/config";
import axios from "axios";
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

export function GastosChart() {
  const [loading, setLoading] = useState(true);
  const [form, _] = useState({ year });
  const [chartData, setChartData] = useState<any>(null);

  // Función para obtener todos los días del mes
  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).getDate()); // Solo el día (1, 2, 3, ...)
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Calculamos todos los días del mes
  const daysOfMonth = getDaysInMonth(currentMonth, year);

  // Configuración de las etiquetas de días
  const labels = daysOfMonth.map((day) => `${day}`);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    const baseUrl = `${BaseUrl}stadisticByDay`;
    const params = {
      year: form.year,
      month: currentMonth + 1, // Enviamos el mes como parámetro (1 - 12)
    };

    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const url = `${baseUrl}?${queryString}`;
    axios.get(url).then((res) => {
      // Suponiendo que la respuesta tenga la forma: [{ day: 1, total: 100 }, { day: 2, total: 50 }, ...]
      const gastosData = res.data.gastos;

      // Llenar los días con 0 en caso de que no haya gastos en algunos días
      const datasetGasto = daysOfMonth.map((day) => {
        const gasto = gastosData.find((g: { day: number }) => g.day === day);
        return gasto ? gasto.amount : 0;
      });

      const ingresosData = res.data.ingresos;

      const datasetIngreso = daysOfMonth.map((day) => {
        const ingreso = ingresosData.find(
          (g: { day: number }) => g.day === day
        );
        return ingreso ? ingreso.amount : 0;
      });

      // Calcular el balance (ingresos - gastos)
      const datasetBalance = datasetIngreso.map((ingreso, index) => {
        return ingreso - datasetGasto[index];
      });

      // Configuración de los datasets para el gráfico
      setChartData([
        {
          labels: labels,
          datasets: [
            {
              label: "Gastos por Día",
              data: datasetGasto,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        },
        {
          labels: labels,
          datasets: [
            {
              label: "Ingresos por Día",
              data: datasetIngreso,
              backgroundColor: "rgba(0, 99, 132, 0.5)",
            },
          ],
        },
        {
          labels: labels,
          datasets: [
            {
              label: "Balance Diario (Ingresos - Gastos)",
              data: datasetBalance,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
          ],
        },
      ]);

      setLoading(false);
    });
  };

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : chartData ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* Gráfico de Balance */}
          <Bar
            style={{
              maxWidth: "80vw",
              maxHeight: "45vh",
            }}
            options={options}
            data={chartData[2]}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* Gráfico de Gastos */}
            <Bar
              style={{
                maxWidth: "40vw",
                maxHeight: "40vh",
              }}
              options={options}
              data={chartData[0]}
            />
            {/* Gráfico de Ingresos */}
            <Bar
              style={{
                maxWidth: "40vw",
                maxHeight: "40vh",
              }}
              options={options}
              data={chartData[1]}
            />
          </div>
        </div>
      ) : (
        <p>No data</p>
      )}
    </>
  );
}
