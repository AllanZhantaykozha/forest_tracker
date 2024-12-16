import { ITree } from "@/types/ITree";
import { formatDate } from "@/utils/formatDate";
import React, { useState } from "react";
import { MonitoringModal } from "./MonitoringModal";

interface Props {
  className?: string;
  setAction: Function;
  trees: ITree[];
}

export const PanelContol: React.FC<Props> = ({
  className,
  setAction,
  trees,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-200 flex flex-col">
      <div className="flex flex-col mb-4">
        <button
          onClick={() => setAction("add")}
          className="w-full p-2 mb-2 bg-transparent border-2 border-black text-black rounded"
        >
          Добавить
        </button>
        <button
          onClick={() => setAction("edit")}
          className="w-full p-2 mb-2 bg-transparent border-2 border-black text-black rounded"
        >
          Редактировать
        </button>
        <button
          onClick={() => setAction("remove")}
          className="w-full p-2 mb-2 bg-transparent border-2 border-black text-black rounded"
        >
          Удалить
        </button>
        <button
          onClick={() => setAction("move")}
          className="w-full p-2 mb-2 bg-transparent border-2 border-black text-black rounded"
        >
          Переместить
        </button>
        {/* Используем MonitoringModal как компонент JSX */}
        <button
          onClick={closeModal}
          className="w-full p-2 mb-2 bg-transparent border-2 border-black text-black rounded"
        >
          Мониторинг
        </button>
      </div>

      {/* Список деревьев */}
      <div className="mt-4 overflow-auto flex-1">
        <h3 className="text-lg font-semibold mb-2">Список деревьев</h3>
        <ul className="space-y-2">
          {trees.map((tree) => (
            <li
              key={tree.id}
              className="p-2 bg-white rounded shadow-md flex flex-col space-y-1"
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

      {/* Передаем пропсы в MonitoringModal */}
      <MonitoringModal isOpen={isOpen} closeModal={closeModal} trees={trees} />
    </div>
  );
};
