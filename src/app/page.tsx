"use client";

import MapComponent from "../components/Map";
import { useState } from "react";

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="w-full">
        <MapComponent />
      </div>
    </div>
  );
};

export default Home;
