import { ITree } from "@/types/ITree";
import { formatDate } from "@/utils/formatDate";
import React, { useState } from "react";
import { MonitoringModal } from "./MonitoringModal";
import { WaterModal } from "./WaterModal";
import { TreesModal } from "./TreesModal";
import { FilterModal } from "./FilterModal";

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
  const [isOpenTrees, setIsOpenTrees] = useState<boolean>(false);
  const [isOpenWater, setIsOpenWater] = useState<boolean>(false);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const closeModalFilter = () => {
    setIsOpen(false);
    setIsOpenWater(false);
    setIsOpenTrees(false);
    setIsOpenFilter(!isOpenFilter);
  };

  const closeModal = () => {
    setIsOpenWater(false);
    setIsOpenTrees(false);
    setIsOpenFilter(false);
    setIsOpen(!isOpen);
  };

  const closeModalWater = () => {
    setIsOpen(false);
    setIsOpenTrees(false);
    setIsOpenFilter(false);
    setIsOpenWater(!isOpenWater);
  };

  const closeModalTrees = () => {
    setIsOpen(false);
    setIsOpenWater(false);
    setIsOpenFilter(false);
    setIsOpenTrees(!isOpenTrees);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-200 flex flex-col">
      <div className="flex flex-col mb-4">
        <button
          onClick={() => setAction("add")}
          className="w-full p-2 mb-2 bg-transparent border-2 border-[#004242] text-[#004242] rounded"
        >
          Добавить
        </button>
        <button
          onClick={() => setAction("edit")}
          className="w-full p-2 mb-2 bg-transparent border-2 border-[#004242] text-[#004242] rounded"
        >
          Редактировать
        </button>
        <button
          onClick={() => setAction("remove")}
          className="w-full p-2 mb-2 bg-transparent border-2 border-[#004242] text-[#004242] rounded"
        >
          Удалить
        </button>
        <button
          onClick={() => setAction("move")}
          className="w-full p-2 mb-2 bg-transparent border-2 border-[#004242] text-[#004242] rounded"
        >
          Переместить
        </button>
        {/* Используем MonitoringModal как компонент JSX */}
        <button
          onClick={closeModal}
          className="w-full p-2 mb-2 bg-transparent border-2 border-[#004242] text-[#004242] rounded"
        >
          Мониторинг
        </button>
        <button
          onClick={closeModalWater}
          className="w-full p-2 mb-2 bg-transparent border-2 border-[#004242] text-[#004242] rounded"
        >
          Полив
        </button>
        <button
          onClick={closeModalTrees}
          className="w-full p-2 mb-2 bg-transparent border-2 border-[#004242] text-[#004242] rounded"
        >
          Паспорта
        </button>
        <button
          onClick={closeModalFilter}
          className="w-full p-2 mb-2 bg-transparent border-2 border-[#004242] text-[#004242] rounded"
        >
          Фильтр
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
      <WaterModal
        isOpen={isOpenWater}
        closeModal={closeModalWater}
        trees={trees}
      />
      <TreesModal
        isOpen={isOpenTrees}
        closeModal={closeModalTrees}
        trees={trees}
      />
      <FilterModal
        isOpen={isOpenFilter}
        closeModal={closeModalFilter}
        trees={trees}
      />
    </div>
  );
};
