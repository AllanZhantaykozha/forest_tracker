"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ITree } from "@/types/ITree";
import { getStreetName } from "@/api/getStreetName";
import { PanelContol } from "./PanelContol";
import { TreeEdit } from "./TreeEdit";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

// Функция для генерации уникального ID из 8 случайных цифр
const generateUniqueId = () => {
  let id = "";
  while (id.length < 8) {
    id += Math.floor(Math.random() * 10).toString();
  }
  return id;
};

const MapComponent = () => {
  const savedTrees = Cookies.get("trees");
  const initialTrees: ITree[] = savedTrees ? JSON.parse(savedTrees) : [];

  const [trees, setTrees] = useState<ITree[]>(initialTrees);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set()); // Массив для отслеживания использованных ID
  const [action, setAction] = useState<
    "add" | "edit" | "remove" | "move" | "view"
  >("view");
  const [selectedTree, setSelectedTree] = useState<ITree | null>(null);

  const markerIcon = new L.Icon({
    iconUrl: "./pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  // Функция для генерации уникального ID
  const generateTreeId = () => {
    let newId = generateUniqueId();
    while (usedIds.has(newId)) {
      // Проверяем, не был ли этот ID уже использован
      newId = generateUniqueId();
    }
    setUsedIds((prevUsedIds) => new Set(prevUsedIds.add(newId))); // Добавляем новый ID в список использованных
    return newId;
  };

  useEffect(() => {
    console.log("Current trees from cookies: ", savedTrees);
    console.log("Trees in state: ", trees);
  }, [savedTrees, trees]);

  function MapEvents() {
    const map = useMapEvents({
      async click(e: any) {
        if (action === "add") {
          const newTree: ITree = {
            id: generateTreeId(), // Генерируем уникальный ID
            species: "",
            position: [e.latlng.lat, e.latlng.lng],
            adress: await getStreetName(e.latlng.lat, e.latlng.lng),
          };
          const updatedTrees = [...trees, newTree];
          setTrees(updatedTrees);
          Cookies.set("trees", JSON.stringify(updatedTrees)); // Сохраняем в cookies
          console.log("Added tree, updated trees: ", updatedTrees); // Лог для проверки
        }
      },
    });
    return null;
  }

  const handleMarkerClick = (tree: ITree) => {
    if (action === "remove") {
      const updatedTrees = trees.filter((t) => t.id !== tree.id);
      setTrees(updatedTrees);
      setUsedIds((prevUsedIds) => {
        const newUsedIds = new Set(prevUsedIds);
        newUsedIds.delete(tree.id); // Убираем удаленный ID из использованных
        return newUsedIds;
      });
      Cookies.set("trees", JSON.stringify(updatedTrees)); // Обновляем cookies при удалении
      console.log("Deleted tree, updated trees: ", updatedTrees); // Лог для проверки
    } else {
      setAction("view");
      setSelectedTree(tree);
    }
  };

  const updateTree = (id: string, updatedData: Partial<ITree>) => {
    const updatedTrees = trees.map((tree) =>
      tree.id === id ? { ...tree, ...updatedData } : tree
    );
    setTrees(updatedTrees);
    Cookies.set("trees", JSON.stringify(updatedTrees)); // Сохраняем в cookies
    console.log("Updated tree, updated trees: ", updatedTrees); // Лог для проверки
  };

  return (
    <div className="h-screen w-full flex text-black overflow-hidden">
      <PanelContol setAction={setAction} trees={trees} />

      <div className="flex-1 h-full">
        <MapContainer
          center={[53.2833, 69.409]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapEvents />

          {trees.map((tree) => (
            <Marker
              icon={markerIcon}
              key={tree.id}
              position={tree.position}
              eventHandlers={{
                click: () => handleMarkerClick(tree),
                dragend: (e) => {
                  if (action === "move") {
                    const updatedPosition = [
                      e.target.getLatLng().lat,
                      e.target.getLatLng().lng,
                    ];
                    updateTree(tree.id, { position: updatedPosition });
                  }
                },
              }}
              draggable={action === "move"}
            >
              <Popup>
                {action === "edit" && (
                  <TreeEdit tree={tree} updateTree={updateTree} />
                )}
                {action === "view" &&
                  selectedTree &&
                  selectedTree.id === tree.id && (
                    <div className="">
                      <h3 className="text-xl font-bold">Паспорт дерева</h3>
                      <p>
                        <strong>ID:</strong> {tree.id}
                      </p>
                      <p>
                        <strong>Адрес:</strong> {tree.adress || "Не указано"}
                      </p>
                      <p>
                        <strong>Координаты:</strong>{" "}
                        {tree.position[0].toFixed(4)},{" "}
                        {tree.position[1].toFixed(4)}
                      </p>
                      <p>
                        <strong>Вид:</strong> {tree.species || "Не указано"}
                      </p>
                      <p>
                        <strong>Возраст:</strong> {tree.age || "Не указано"}
                      </p>
                      <p>
                        <strong>Длина:</strong> {tree.height || "Не указано"}
                      </p>
                      <p>
                        <strong>Обхват:</strong> {tree.girth || "Не указано"}
                      </p>
                      <p>
                        <strong>Состояние:</strong>{" "}
                        {tree.condition || "Не указано"}
                      </p>
                      <p>
                        <strong>Дата посадки:</strong>{" "}
                        {tree.plantingDate || "Не указано"}
                      </p>
                    </div>
                  )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MapComponent;
