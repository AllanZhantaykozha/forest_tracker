"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface Props {
  className?: string;
}

const Login: React.FC<Props> = ({ className }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли информация о входе в cookies
    const authCookie = Cookies.get("isAuthenticated");
    if (authCookie === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      setIsAuthenticated(true);
      Cookies.set("isAuthenticated", "true", { expires: 7 }); // Сохраняем состояние входа на 7 дней
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove("isAuthenticated"); // Удаляем cookie при выходе
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {isAuthenticated ? (
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
          <ul className="space-y-2">
            <li>
              <a href="/adminmap" className="text-white hover:underline">
                <div className="bg-blue-500 rounded-lg flex justify-center py-5">
                  Карта
                </div>
              </a>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="w-full mt-4 px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Вход
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                placeholder="Пароль"
                type="password"
                id="password"
                className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Войти
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
