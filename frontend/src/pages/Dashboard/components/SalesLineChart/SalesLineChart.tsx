import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { TypeWithKey } from "@/models";
import { Chart as ChartJS, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip as Tool, Legend, Title, Filler } from "chart.js";
import { Line } from 'react-chartjs-2';
import { Tooltip } from '@mui/material';
import { chartDownload } from '@/utilities';
import { useRef } from 'react';

interface SalesLineChartInterface {
  monthlySales: {
    year: number;
    month: number;
    categorySales: TypeWithKey<number>;
    sales: number;
  }[];
  categoryColors: TypeWithKey<{default: string, hover: string}>;
}

const SalesLineChart: React.FC<SalesLineChartInterface> = ({ monthlySales, categoryColors }) => {
  ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tool, Legend, Filler, Title);

  const lineChart = useRef(null);

  const labels = monthlySales.map((month) => `${month.year}-${month.month}`);
  const categoryLabels = Array.from(
    new Set(monthlySales.flatMap(month => Object.keys(month.categorySales)))
  );
  
  const totalSalesData = monthlySales.map((month) => month.sales);
  const categoryData = categoryLabels.map((category) =>
    monthlySales.map((month) => month.categorySales[category])
  );

  const datasets = [
    {
      label: 'Ventas totales por mes',
      data: totalSalesData,
      borderColor: 'rgb(142, 112, 84)',
      borderWidth: 2,
      fill: false,
    },
    ...categoryLabels.map((category, index) => ({
      label: `Ventas de ${category}`,
      data: categoryData[index],
      borderColor: categoryColors[category].default,
      borderWidth: 2,
      fill: false,
    })),
  ];

  const LineData = {
    labels,
    datasets,
  };

  return (
    <>
      <Line
        ref={lineChart}
        data={LineData}
        options={{
          maintainAspectRatio: false,
          resizeDelay: 0,
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true
              }
            },
            tooltip: {
              usePointStyle: true,
              borderWidth: 3,
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label;
                  const value = context.parsed.y;
                  return ` ${label}: $${value.toFixed(2)}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Meses',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Ventas',
              },
            },
          },
        }}
      />
      <Tooltip title='Descargar'>
        <button onClick={() => chartDownload(lineChart, 'ventas-mensuales')}>
          <FileDownloadOutlinedIcon sx={{ fontSize: 25 }} />
        </button>
      </Tooltip>
    </>
  );
};

export default SalesLineChart;