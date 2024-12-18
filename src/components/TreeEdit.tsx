import { ITree } from "@/types/ITree";
import React from "react";

interface Props {
  className?: string;
  tree: ITree;
  updateTree: Function;
}

export const TreeEdit: React.FC<Props> = ({ className, tree, updateTree }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="species" className="w-1/3 text-xs">
          Вид и порода:
        </label>
        <input
          id="species"
          type="text"
          value={tree.species}
          onChange={(e) => updateTree(tree.id, { species: e.target.value })}
          className="w-2/3 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="age" className="w-1/3 text-xs">
          Возраст:
        </label>
        <input
          id="age"
          type="number"
          value={tree.age || ""}
          onChange={(e) => updateTree(tree.id, { age: Number(e.target.value) })}
          className="w-2/3 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="height" className="w-1/3 text-xs">
          Длина (м):
        </label>
        <input
          id="height"
          type="number"
          value={tree.height || ""}
          onChange={(e) =>
            updateTree(tree.id, {
              height: Number(e.target.value),
            })
          }
          className="w-2/3 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="girth" className="w-1/3 text-xs">
          Обхват (см):
        </label>
        <input
          id="girth"
          type="number"
          value={tree.girth || ""}
          onChange={(e) =>
            updateTree(tree.id, { girth: Number(e.target.value) })
          }
          className="w-2/3 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="condition" className="w-1/3 text-xs">
          Состояние:
        </label>
        <select
          id="condition"
          value={tree.condition || ""}
          onChange={(e) =>
            updateTree(tree.id, {
              condition: e.target.value as ITree["condition"],
            })
          }
          className="w-2/3 p-2 border border-gray-300 rounded"
        >
          <option value="">Выберите состояние</option>
          <option value="Отлично">Отлично</option>
          <option value="Удовлетворительно">Удовлетворительно</option>
          <option value="Плохо">Плохо</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="plantingDate" className="w-1/3 text-xs">
          Дата посадки:
        </label>
        <input
          id="plantingDate"
          type="datetime-local"
          value={tree.plantingDate || ""}
          onChange={(e) =>
            updateTree(tree.id, { plantingDate: e.target.value })
          }
          className="w-2/3 p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};
