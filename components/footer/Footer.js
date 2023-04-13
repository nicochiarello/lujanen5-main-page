import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[6rem] bg-white flex flex-col items-center justify-center">
        <Link href={"/"} className="text-[30px] abril-font">
          Luján en 5<span className="main-color">’</span>{" "}
        </Link>
      </div>
      <div className="w-full bg-gray-900 text-white py-2 flex flex-col items-center justify-center">
        <p className="font-semibold">www.lujanen5.com</p>
      </div>
    </div>
  );
};

export default Footer;
