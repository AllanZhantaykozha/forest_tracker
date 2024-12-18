"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ITree } from "@/types/ITree";
import { getStreetName } from "@/api/getStreetName";
import { TreeEdit } from "./TreeEdit";
import Cookies from "js-cookie";

const MapComponentLite = () => {
  const savedTrees = Cookies.get("trees");
  const initialTrees: ITree[] = savedTrees ? JSON.parse(savedTrees) : [];

  const [trees, setTrees] = useState<ITree[]>(initialTrees);
  const [action, setAction] = useState<"add" | "edit" | "remove" | "move">(
    "add"
  );

  const markerIcon = new L.Icon({
    iconUrl: "./pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  function MapEvents() {
    const map = useMapEvents({
      async click(e: any) {
        if (action === "add") {
          const newTree: ITree = {
            id: trees.length + 1,
            species: "",
            position: [e.latlng.lat, e.latlng.lng],
            adress: await getStreetName(e.latlng.lat, e.latlng.lng),
          };
          const updatedTrees = [...trees, newTree];
          setTrees(updatedTrees);
          Cookies.set("trees", JSON.stringify(updatedTrees));
        }
      },
    });
    return null;
  }

  const handleMarkerClick = (id: number) => {
    if (action === "remove") {
      const updatedTrees = trees.filter((tree) => tree.id !== id);
      setTrees(updatedTrees);
      Cookies.set("trees", JSON.stringify(updatedTrees));
    }
  };

  // Функция для обновления паспорта дерева
  const updateTree = (id: number, updatedData: Partial<ITree>) => {
    const updatedTrees = trees.map((tree) =>
      tree.id === id ? { ...tree, ...updatedData } : tree
    );
    setTrees(updatedTrees);
    Cookies.set("trees", JSON.stringify(updatedTrees));
  };

  return (
    <div className="h-screen w-full flex text-black overflow-hidden">
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
                click: () => handleMarkerClick(tree.id),
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
                <div>
                  {action === "edit" && (
                    <TreeEdit tree={tree} updateTree={updateTree} />
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponentLite;
