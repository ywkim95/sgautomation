import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  type ChartOptions,
} from "chart.js";
import ChartProps from "./Chart.model.tsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const BarChart = ({ chart }: { chart: ChartProps }) => {
  const calc = (a: number, b: number) => {
    if (a > b) {
      return a * 1.2;
    } else {
      return b * 1.2;
    }
  };

  const data: ChartData<"bar", number[], string> = {
    labels: [chart.title],
    datasets: [
      {
        label: chart.label_1,
        data: [chart.data_1],
        backgroundColor: chart.color_1,
      },
      {
        label: chart.label_2,
        data: [chart.data_2 ?? 0],
        backgroundColor: chart.color_2 ?? "transparent",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    aspectRatio: 0,
    responsive: true,

    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 10, // 레전드의 글자 크기
          },
        },
      },
      title: {
        display: true,
        text: chart.title,
        padding: {
          top: 5, // 제목의 상단 여백
          bottom: 10, // 제목의 하단 여백
        },
        font: {
          size: 14, // 제목의 글자 크기
        },
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          size: 14, // 툴팁 내부 텍스트의 글자 크기
        },
        callbacks: {
          label: (context) => [
            `${context.dataset.label || ""}`,
            `Value: ${context.parsed.y}`,
            `Color: ${context.dataset.backgroundColor}`,
          ],
          // {
          //   let label = context.dataset.label || "";
          //   if (label) {
          //     label += " Value: ";
          //   }
          //   if (context.parsed.y !== null) {
          //     label += context.parsed.y;
          //   }
          //   label += `\n Color: ${context.dataset.backgroundColor}`;
          //   return label;
          // },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,

        display: true,
        ticks: {
          font: {
            size: 11, // Y축 틱의 글자 크기
          },
        },
        suggestedMax: calc(chart.data_1, chart.data_2 ?? 0),
      },
    },
  };

  if (data) {
    return <Bar data={data} options={options} />;
  }
  return null;
};

export default BarChart;
