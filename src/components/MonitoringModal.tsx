import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Регистрация нужных компонентов для Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Интерфейс данных для дерева
export interface ITree {
  id: number;
  adress: string;
  species: string;
  age?: number;
  height?: number;
  diameter?: number;
  length?: number; // Длина дерева
  girth?: number; // Обхват дерева
  position: [number, number];
  condition?: "Отлично" | "Удовлетворительно" | "Плохо";
  diseases?: string;
  plantingDate?: string;
}

interface Props {
  className?: string;
  isOpen: boolean;
  closeModal: () => void;
  trees: ITree[]; // Массив деревьев, поступающий извне
}

export const MonitoringModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  trees,
}) => {
  if (!isOpen) return null;

  // Группируем деревья по адресу и подсчитываем количество
  const streetTreeCounts = trees.reduce((acc, tree) => {
    if (acc[tree.adress]) {
      acc[tree.adress] += 1;
    } else {
      acc[tree.adress] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Массив улиц и количество деревьев на каждой
  const streetLabels = Object.keys(streetTreeCounts);
  const treeCounts = streetLabels.map((street) => streetTreeCounts[street]);

  // Данные для столбчатой диаграммы
  const barData = {
    labels: streetLabels,
    datasets: [
      {
        label: "Количество деревьев по улицам",
        data: treeCounts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Данные для круговой диаграммы по состоянию деревьев
  const conditionCounts = trees.reduce(
    (acc, tree) => {
      if (tree.condition === "Отлично") acc.excellent += 1;
      if (tree.condition === "Удовлетворительно") acc.satisfactory += 1;
      if (tree.condition === "Плохо") acc.poor += 1;
      return acc;
    },
    { excellent: 0, satisfactory: 0, poor: 0 }
  );

  const doughnutData = {
    labels: ["Отлично", "Удовлетворительно", "Плохо"],
    datasets: [
      {
        data: [
          conditionCounts.excellent,
          conditionCounts.satisfactory,
          conditionCounts.poor,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCD56"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div
      className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9998,
      }}
      onClick={closeModal}
    >
      <div
        className="rounded-2xl flex justify-between p-20 gap-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()} // Чтобы клик по контенту не закрывал окно
        style={{
          position: "relative",
          width: "80vw",
          height: "80vh",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "auto",
        }}
      >
        <button
          onClick={closeModal}
          className=""
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Закрыть
        </button>

        {/* Столбчатая диаграмма */}
        <div className="w-full">
          <h3>Количество деревьев по улицам</h3>
          <div style={{ maxWidth: "100%", height: "300px" }}>
            <Bar data={barData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Круговая диаграмма по состоянию деревьев */}
        <div className="w-full flex justify-center">
          <div className="">
            <h3>Состояние деревьев</h3>
            <div style={{ maxWidth: "100%", height: "300px" }}>
              <Doughnut data={doughnutData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
