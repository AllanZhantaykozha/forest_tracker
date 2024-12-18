export interface ITree {
  id: string;
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
