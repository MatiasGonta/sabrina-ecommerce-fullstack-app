import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { TypeWithKey } from "@/models";
import { chartDownload } from "@/utilities";
import { Tooltip } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { useRef } from 'react';

interface SalesCategoriesDoughnutChartInterface {
  salesByCategory: TypeWithKey<number>;
  categoryColors: TypeWithKey<{default: string, hover: string}>;
}

const SalesCategoriesDoughnutChart: React.FC<SalesCategoriesDoughnutChartInterface> = ({ salesByCategory, categoryColors }) => {
  const doughnutChart = useRef(null);

  const categories: string[] = Object.keys(salesByCategory);
  const categoryCounts: number[] = Object.values(salesByCategory);

  const doughnutData = {
    labels: categories,
    datasets: [
      {
        data: categoryCounts,
        backgroundColor: categories.map((category: string) => categoryColors[category].default),
        hoverBackgroundColor: categories.map((category: string) => categoryColors[category].hover)
      },
    ],
    hoverOffset: 4,
  };

  return (
    <>
      <Doughnut
        ref={doughnutChart}
        data={doughnutData}
        options={{
          maintainAspectRatio: false,
          resizeDelay: 0,
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              usePointStyle: true,
              callbacks: {
                label: (context: any) => {
                  const value = categoryCounts[context.dataIndex];
                  return ` $${value.toFixed(2)}`;
                },
              },
            },
          },
        }}
      />
      <Tooltip title='Descargar'>
        <button onClick={() => chartDownload(doughnutChart, 'ventas-por-categoria')}>
          <FileDownloadOutlinedIcon sx={{ fontSize: 25 }} />
        </button>
      </Tooltip>
    </>
  );
};

export default SalesCategoriesDoughnutChart;