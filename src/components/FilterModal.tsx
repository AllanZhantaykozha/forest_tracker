import React, { useState } from "react";
import { ITree } from "@/types/ITree";

interface Props {
  className?: string;
  isOpen: boolean;
  closeModal: () => void;
  trees: ITree[];
}

export const FilterModal: React.FC<Props> = ({ isOpen, closeModal, trees }) => {
  const [filters, setFilters] = useState<Partial<ITree>>({});
  const [filteredTrees, setFilteredTrees] = useState<ITree[]>(trees);

  if (!isOpen) return null;

  const handleFilterChange = (field: keyof ITree, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyFilters = () => {
    let result = trees;

    // Фильтруем по каждому указанному полю
    Object.keys(filters).forEach((key) => {
      const field = key as keyof ITree;
      const value = filters[field];

      if (value) {
        result = result.filter((tree) =>
          typeof value === "string"
            ? tree[field]
                ?.toString()
                .toLowerCase()
                .includes(value.toString().toLowerCase())
            : tree[field] === value
        );
      }
    });

    setFilteredTrees(result);
  };

  const resetFilters = () => {
    setFilters({});
    setFilteredTrees(trees);
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
          width: "80vw",
          height: "80vh",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "auto",
        }}
      >
        <button
          onClick={closeModal}
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

        <h2 className="text-xl font-bold mb-4">Фильтрация деревьев</h2>

        {/* Поля для фильтрации */}
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Улица"
            className="border p-2 rounded"
            value={filters.adress || ""}
            onChange={(e) => handleFilterChange("adress", e.target.value)}
          />
          <input
            type="number"
            placeholder="Возраст"
            className="border p-2 rounded"
            value={filters.age || ""}
            onChange={(e) => handleFilterChange("age", Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Вид"
            className="border p-2 rounded"
            value={filters.species || ""}
            onChange={(e) => handleFilterChange("species", e.target.value)}
          />
          {/* Выпадающий список для фильтрации по состоянию */}
          <select
            className="border p-2 rounded"
            value={filters.condition || ""}
            onChange={(e) => handleFilterChange("condition", e.target.value)}
          >
            <option value="">Выберите состояние</option>
            <option value="Отлично">Отлично</option>
            <option value="Удовлетворительно">Удовлетворительно</option>
            <option value="Плохо">Плохо</option>
          </select>
        </div>

        {/* Кнопки */}
        <div className="flex gap-4">
          <button
            onClick={applyFilters}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Применить фильтры
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Сбросить фильтры
          </button>
        </div>

        {/* Список деревьев */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {filteredTrees.map((tree) => (
            <li
              key={tree.id}
              className="p-4 bg-white rounded shadow-md flex flex-col space-y-1"
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
                  new Date(tree.plantingDate).toLocaleDateString()
                ) : (
                  <span className="text-gray-500">Не указано</span>
                )}
              </p>
            </li>
          ))}
        </ul>

        {filteredTrees.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Нет деревьев, соответствующих указанным фильтрам.
          </p>
        )}
      </div>
    </div>
  );
};
