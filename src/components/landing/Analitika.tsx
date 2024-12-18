import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analit() {
  const lineData = {
    labels: [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ],
    datasets: [
      {
        label: "Вырублено",
        data: [50, 100, 25, 120, 180, 200, 220, 210, 250, 280, 300, 350],
        borderColor: "#16403F",
        backgroundColor: "#16403F",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Посажено",
        data: [30, 60, 90, 70, 110, 150, 250, 160, 200, 220, 250, 300],
        borderColor: "#A95757",
        backgroundColor: "#A95757",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Вырубка лесов",
        font: { size: 24, color: "#000" },
        padding: { bottom: 20 },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const datasetLabel = tooltipItem.dataset.label;
            const dataValue = tooltipItem.raw;
            const label = tooltipItem.label;
            return `${datasetLabel} в ${label}: ${dataValue} деревьев`;
          },
        },
      },
    },
    scales: {
      x: { title: { display: false } },
      y: {
        title: { display: false },
        min: 0,
        ticks: { callback: (value: number) => `${value}` },
      },
    },
  };

  const doughnutData = {
    labels: ["Вырублено", "Посажено", "Пожар", "Продажа"],
    datasets: [
      {
        data: [3500, 2500, 800, 1500],
        backgroundColor: ["#D8CA9F", "#D8815F", "#A85856", "#878C63"],
        borderColor: ["#D8CA9F", "#D8815F", "#A85856", "#878C63"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const label = tooltipItem.label;
            const value = tooltipItem.raw;
            return `${label}: ${value} деревьев`;
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="bg-white h-screen p-10 align-middle content-center">
      <div className="text-center mb-10">
        <div className="text-[40px] font-semibold pb-40 text-[#16403F]">
          Визуализация информации о лесах
        </div>
      </div>

      <div className="flex justify-center space-x-10 gap-20 mt-[-50px]">
        <div className="w-[40%] h-[400px]">
          <Line data={lineData} options={lineOptions} />
        </div>

        <div className="w-[40%] h-[400px] flex flex-col justify-center items-center">
          <div className="text-center text-[24px] font-semibold text-[#16403F] mb-5">
            Распределение лесных угодий в Казахстане
          </div>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
