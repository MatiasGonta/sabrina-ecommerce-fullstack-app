import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { TypeWithKey } from '@/models';
import { chartDownload } from '@/utilities';
import { BarElement, Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip as Tool, Legend, Filler, Title } from 'chart.js';
import { useRef } from 'react';
import { Tooltip } from '@mui/material';
import { Bar } from 'react-chartjs-2';

interface BarChartInterface {
  data: TypeWithKey<number>;
}

const BarChart: React.FC<BarChartInterface> = ({ data }) => {
  ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tool, Legend, Filler, Title);
  
  const barChart = useRef(null);

  const labels: string[] = Object.keys(data);
  const values: number[] = Object.values(data);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Nuevos usuarios en el último mes',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        data: values,
      },
    ],
  };

  return (
    <>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          resizeDelay: 0,
          responsive: true,
          plugins: {
            subtitle: {
              display: true,
              text: 'Custom Chart Subtitle'
            },
            legend: {
              position: "top",
            },
            tooltip: {
              usePointStyle: true,
              callbacks: {
                label: (context: any) => {
                  const label = context.dataset.label;
                  const value = context.parsed.y;
                  return ` ${label}: $${value.toFixed(2)}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
        ref={barChart}
      />
      <Tooltip title='Descargar'>
        <button onClick={() => chartDownload(barChart, 'usuarios-mensuales')}>
          <FileDownloadOutlinedIcon sx={{ fontSize: 25 }} />
        </button>
      </Tooltip>
    </>
  );
};

export default BarChart;