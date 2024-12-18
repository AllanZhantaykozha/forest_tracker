import React from "react";
import Analitika from "./Analitika";
import Footer from "./Footer";

interface Props {
  className?: string;
}

export const Main: React.FC<Props> = ({ className }) => {
  return (
    <div className={`className w-full`}>
      <div className="h-screen w-full bg-[url('/photomain.jpg')] bg-cover grid grid-cols-2 px-52 py-20 gap-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg flex flex-col gap-5 relative">
          <div className="relative z-10">
            <div className="text-[#D9CA9D] text-xl font-bold">
              CRM система Ekosana Kokshetau для учета и анализа зеленых
              насаждений
            </div>
            <div className="text-white text-lg flex items-start font-light">
              Добро пожаловать в Ekosana Kokshetau - инновационное мобильное
              приложение, созданное для эффективного учета и всестороннего
              анализа зеленых насаждений в вашем городе или регионе. Это
              незаменимый инструмент для экологического мониторинга и озеленения
              территорий.
            </div>
            <div className="absolute py-10">
              <img
                src="/3-image.jpeg"
                alt="Welcome"
                className="object-cover w-full h-full  rounded-3xl"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-5">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg flex flex-col gap-5 relative">
            {/* Пустой блок с изображением */}
            <div className="absolute inset-0 p-10">
              <img
                src="/1-image.jpg"
                alt="Empty content"
                className="object-cover w-full h-full  rounded-3xl"
              />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg flex flex-col gap-5">
            <div className="text-[#D9CA9D] text-xl font-bold z-10">
              Стимулирование зеленого роста
            </div>
            <div className="text-white text-lg flex items-start font-light">
              Контроль полива: отслеживайте частоту и объем полива, чтобы
              обеспечить оптимальное увлажнение для каждого растения. Графики
              внесения удобрений: ведите подробные записи о том, когда и сколько
              удобрений вносится для поддержания здоровья растений.
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full bg-white">
        <Analitika />
      </div>
      <div className="h-screen w-full bg-[url('/photomain.jpg')] py-20 px-52 grid gap-10 bg-cover">
        <div className="grid grid-cols-2 gap-10 justify-between">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg flex flex-col gap-5">
            <div className="text-[#D9CA9D] text-2xl font-bold">
              Совместимость с ГИС
            </div>
            <div className="text-white text-xl flex items-start font-light">
              Бесшовная интеграция с ведущими геопространственными
              информационными системами для визуализации данных о растениях в
              пространственном контексте.
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg flex flex-col gap-5">
            <div className="text-[#D9CA9D] text-2xl font-bold">
              Городское планирование
            </div>
            <div className="text-white text-xl flex items-start font-light">
              Принятие решений по градостроительству и ландшафтному дизайну на
              основе комплексного представления о распространении и состоянии
              городских лесов.
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg flex flex-col gap-5">
            <div className="text-[#D9CA9D] text-2xl font-bold">Выбор места</div>
            <div className="text-white text-xl flex items-start font-light">
              Используйте географические данные для определения оптимальных мест
              для новых посадок, учитывая такие факторы, как качество почвы,
              солнечный свет и инфраструктура.
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full bg-[#16403F]">
        <Footer />
      </div>
    </div>
  );
};
