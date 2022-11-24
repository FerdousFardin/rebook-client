import React from "react";
import { Link } from "react-router-dom";

export default function PrimaryBtn({ className, onClick, to, children }) {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`relative flex items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-black hover:before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 ${className}`}
    >
      <span className="flex relative text-white items-center gap-5 tracking-wider">
        {children}
      </span>
    </Link>
  );
}
