import { ITree } from "@/types/ITree";
import React from "react";

interface Props {
  className?: string;
  tree: ITree;
  updateTree: Function;
}

export const TreeEdit: React.FC<Props> = ({ className, tree, updateTree }) => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Вид и порода"
        value={tree.species}
        onChange={(e) => updateTree(tree.id, { species: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Возраст"
        value={tree.age || ""}
        onChange={(e) => updateTree(tree.id, { age: Number(e.target.value) })}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Длина (м)"
        value={tree.length || ""}
        onChange={(e) =>
          updateTree(tree.id, {
            length: Number(e.target.value),
          })
        }
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Обхват (см)"
        value={tree.girth || ""}
        onChange={(e) => updateTree(tree.id, { girth: Number(e.target.value) })}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <select
        value={tree.condition || ""}
        onChange={(e) =>
          updateTree(tree.id, {
            condition: e.target.value as ITree["condition"],
          })
        }
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Выберите состояние</option>
        <option value="Отлично">Отлично</option>
        <option value="Удовлетворительно">Удовлетворительно</option>
        <option value="Плохо">Плохо</option>
      </select>
      <input
        type="datetime-local"
        value={tree.plantingDate || ""}
        onChange={(e) => updateTree(tree.id, { plantingDate: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};
