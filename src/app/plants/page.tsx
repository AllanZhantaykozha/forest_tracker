"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function PlantsPage() {
  const plants = [
    {
      name: "Берёза",
      description:
        "Берёза — символ русской природы. Она ценится за свою красоту, неприхотливость и способность очищать воздух. Это дерево прекрасно подходит для озеленения городских парков и создания уютных аллей.",
      image: "/birch.png", // Замените на путь к вашей картинке
    },
    {
      name: "Ель",
      description:
        "Ель — вечнозелёное дерево, которое дарит свежий воздух и создаёт атмосферу уюта круглый год. Её хвойный аромат улучшает настроение, а её крона делает любой лес живописным.",
      image: "/Spruce.png", // Замените на путь к вашей картинке
    },
    {
      name: "Тополь",
      description:
        "Тополь — одно из самых быстрых в росте деревьев, идеально подходящее для городского озеленения. Он эффективно поглощает углекислый газ и способствует улучшению городской экологии.",
      image: "/Poplar.png", // Замените на путь к вашей картинке
    },
  ];

  return (
    <div className="bg-green-50">
      {plants.map((plant, index) => {
        const { ref, inView } = useInView({
          triggerOnce: true, // Анимация запускается только один раз, когда элемент появляется на экране
          threshold: 0.5, // Элемент должен быть на 50% видимым, чтобы анимация началась
        });

        return (
          <motion.div
            key={plant.name}
            ref={ref} // Подключаем ref для отслеживания видимости
            className="flex flex-col md:flex-row items-center justify-center min-h-screen py-8 px-4 md:px-52"
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={{
              opacity: inView ? 1 : 0, // Анимация запускается только когда элемент в видимости
              x: inView ? 0 : index % 2 === 0 ? -100 : 100,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Левый блок с текстом */}
            <div
              className={`md:w-1/2 text-center md:text-left mb-8 md:mb-0 px-4 ${
                index % 2 === 1 ? "md:order-last" : ""
              }`}
            >
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-700 via-green-500 to-green-300 text-transparent bg-clip-text mb-4">
                {plant.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-green-400 pl-4">
                {plant.description}
              </p>
            </div>

            {/* Правый блок с изображением */}
            <div className="md:w-1/2 flex justify-center px-4">
              <div>
                <Image
                  src={plant.image}
                  alt={plant.name}
                  width={500}
                  height={500}
                  className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
