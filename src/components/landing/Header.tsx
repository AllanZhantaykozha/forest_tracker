import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={`className text-[#D9CA9D] relative w-full h-20 flex justify-center gap-10 bg-[#16403F] items-center`}
    >
      <div className="flex gap-10">
        <div className="">
          <Link href={"/"}>О проекте</Link>
        </div>
        <div className="">
          <Link href={"/map"}>Карта</Link>
        </div>
        <div className="">
          <Link href={"/plants"}>Виды растительности</Link>
        </div>
        <div className="">
          <Link href={"/news"}>Новости</Link>
        </div>
      </div>

      <div className="absolute right-10 cursor-pointer">
        <Link href={"/login"}>
          <Image src={"/cab.png"} width={50} height={50} alt="person" />
        </Link>
      </div>
    </div>
  );
};
