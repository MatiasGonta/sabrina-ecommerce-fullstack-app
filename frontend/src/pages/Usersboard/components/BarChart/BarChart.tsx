import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { LoadingSpinnerType } from '@/models';
import { chartDownload } from '@/utilities';
import { BarElement, Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip as Tool, Legend, Filler, Title } from 'chart.js';
import { useRef } from 'react';
import { Tooltip } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useGetUsersStatistics } from '@/hooks';
import { LoadingSpinner } from '@/components/ui';

interface BarChartInterface {}

const BarChart: React.FC<BarChartInterface> = () => {
  ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tool, Legend, Filler, Title);

  const { data, isLoading } = useGetUsersStatistics();

  const barChart = useRef(null);

  const labels: string[] = Object.keys(data?.newUsersPerDay || {});
  const values: number[] = Object.values(data?.newUsersPerDay || {});

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

  return isLoading ? <LoadingSpinner type={LoadingSpinnerType.FLEX}/> : (
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
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
        ref={barChart}
      />
      <Tooltip title='Descargar'>
        <button className="usersboard__users__statistics__bar-chart__download-btn" onClick={() => chartDownload(barChart, 'usuarios-mensuales')}>
          <FileDownloadOutlinedIcon sx={{ fontSize: 25 }} />
        </button>
      </Tooltip>
    </>
  );
};

export default BarChart;