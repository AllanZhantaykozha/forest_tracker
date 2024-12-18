import React from "react";
import { ITree } from "@/types/ITree";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  className?: string;
  isOpen: boolean;
  closeModal: () => void;
  trees: ITree[];
}

// Форматирование даты (функция, которую можно использовать)
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("ru-RU", options);
};

export const TreesModal: React.FC<Props> = ({ isOpen, closeModal, trees }) => {
  if (!isOpen) return null;

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
          width: "70vw",
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

        <h2 className="text-xl font-bold mb-4">Список деревьев</h2>

        <ul
          className="grid gap-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {trees.map((tree) => (
            <li
              key={tree.id}
              className="p-4 bg-white rounded shadow-md flex flex-col space-y-2 border"
              style={{
                border: "1px solid #e0e0e0",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p className="font-medium">ID: {tree.id}</p>
              <p className="text-sm">
                Адрес:{" "}
                {tree.adress || (
                  <span className="text-gray-500">Не указано</span>
                )}
              </p>
              <p className="text-sm">
                Координаты: {tree.position[0].toFixed(4)},{" "}
                {tree.position[1].toFixed(4)}
              </p>
              <p className="text-sm">
                Вид:{" "}
                {tree.species || (
                  <span className="text-gray-500">Не указано</span>
                )}
              </p>
              <p className="text-sm">
                Возраст:{" "}
                {tree.age || <span className="text-gray-500">Не указано</span>}{" "}
                {tree.age ? <span>года</span> : ""}
              </p>
              <p className="text-sm">
                Длина:{" "}
                {tree.length || (
                  <span className="text-gray-500">Не указано</span>
                )}{" "}
                {tree.length ? <span>м</span> : ""}
              </p>
              <p className="text-sm">
                Обхват:{" "}
                {tree.girth || (
                  <span className="text-gray-500">Не указано</span>
                )}{" "}
                {tree.girth ? <span>см</span> : ""}
              </p>
              <p className="text-sm">
                Состояние:{" "}
                {tree.condition || (
                  <span className="text-gray-500">Не указано</span>
                )}
              </p>
              <p className="text-sm">
                Дата посадки:{" "}
                {tree.plantingDate ? (
                  formatDate(tree.plantingDate)
                ) : (
                  <span className="text-gray-500">Не указано</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
