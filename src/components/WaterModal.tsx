import React from "react";
import { ITree } from "@/types/ITree";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  className?: string;
  isOpen: boolean;
  closeModal: () => void;
  trees: ITree[];
}

export const WaterModal: React.FC<Props> = ({ isOpen, closeModal, trees }) => {
  if (!isOpen) return null;

  // Группировка деревьев по улицам
  const streets = trees.reduce<Record<string, ITree[]>>((acc, tree) => {
    if (!acc[tree.adress]) acc[tree.adress] = [];
    acc[tree.adress].push(tree);
    return acc;
  }, {});

  const handleWatering = (street: string) => {
    // Уведомление о начале полива
    toast.info(`Полив по улице "${street}" начат.`, { autoClose: 3000 });

    // Уведомление о завершении через 5 секунд
    setTimeout(() => {
      toast.success(`Полив по улице "${street}" завершен.`);
    }, 5000);
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
        className="rounded-2xl flex flex-col p-10 gap-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()} // Чтобы клик по контенту не закрывал окно
        style={{
          position: "relative",
          width: "60vw",
          maxHeight: "80vh",
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

        <h2 className="text-xl font-bold mb-4">Система полива</h2>

        {Object.keys(streets).length === 0 ? (
          <p>Нет доступных улиц для полива.</p>
        ) : (
          Object.keys(streets).map((street) => (
            <div
              key={street}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{street}</span>
              <button
                onClick={() => handleWatering(street)}
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
              >
                Начать полив
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
