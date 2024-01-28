import { Chart } from "chart.js";

export const chartDownload = (chartRef: React.RefObject<Chart>, title: string) => {
    const monthNames: string[] = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

    if (!chartRef.current) return;

    const chart = chartRef.current;
    const canvas = chart.ctx.canvas;
    
    const url = canvas.toDataURL('image/jpg');
    
    const date = new Date();
    const month = date.getMonth(); 
    const download = `${title}-${date.toString().substring(8,10)}-${monthNames[month + 1]}-${date.toString().substring(11,15)}.jpg`;
    const link = document.createElement('a');
    
    link.href = url;
    link.download = download.toLowerCase();
    link.click();
};