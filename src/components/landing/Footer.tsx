import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#16403F] min-h-screen text-white flex flex-col justify-between px-52 py-24">
      <div className="grid grid-cols-3 gap-10">
        <div className="grid gap-10">
          <p className="text-[#D9CA9D] text-4xl font-bold">О проекте</p>
          <div className="">
            <p className="text-2xl font-light">
              Forest Tracker предоставляет современные инструменты для учета и
              анализа зеленых насаждений. Цель проекта - помочь городам и
              регионам эффективно управлять своими зелеными зонами.
            </p>
          </div>
        </div>

        <div className="grid">
          <p className="text-[#D9CA9D] text-4xl font-bold">Полезные ссылки</p>
          <div className="">
            <p className="text-2xl font-light">
              <a href="#" className="">
                Новости и обновления <br />
              </a>
              <a href="#">
                Контактная информация <br />
              </a>
              <a href="#">
                Часто задаваемые вопросы (FAQ) <br />
              </a>
              <a href="#">
                Политика конфиденциальности <br />
              </a>
            </p>
          </div>
        </div>

        <div className="grid">
          <p className="text-[#D9CA9D] text-4xl font-bold">Контакты</p>
          <div className="">
            <p className="text-2xl font-light">
              Email: info@foresttracker.com <br />
              Телефон: +123 456 7890 <br />
              Адрес: ул. Шевченко 00 кв. 00
            </p>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="flex justify-center gap-8 mt-14">
          <a href="https://www.instagram.com/vtk_kokshetau_forever/">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png"
              }
              alt="Instagram"
              className="w-8 h-8"
            />
          </a>
          <a href="https://www.facebook.com/vk.kokshe/?profile_tab_item_selected=about&_rdr">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/600px-Facebook_Logo_2023.png?20231011121526"
              }
              alt="Facebook"
              className="w-8 h-8"
            />
          </a>
          <a href="">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/X_logo_2023_original.svg/300px-X_logo_2023_original.svg.png?20230728155658"
              }
              alt="X"
              className="w-8 h-8"
            />
          </a>
        </div>

        <div className="flex justify-center mt-6">
          <p className="text-2xl font-light">
            © 2024 Forest Tracker. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
