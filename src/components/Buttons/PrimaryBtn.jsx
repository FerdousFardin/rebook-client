import React from "react";
import { Link } from "react-router-dom";

export default function PrimaryBtn({
  className,
  onClick,
  to,
  children,
  shouldPrevent,
}) {
  return (
    <Link
      preventScrollReset={shouldPrevent || false}
      onClick={onClick}
      to={to}
      className={`w-auto mx-auto sm:mx-0 text-xs font-medium flex items-center justify-center px-8 duration-300  text-black border border-black inset-0 rounded-full hover:shadow-[0px_3px_0px_0px_#231b15] hover:-translate-y-1 active:translate-y-0 active:shadow-[0px_2px_0px_0px_#231b15] ${className}`}
    >
      <span className="flex relative items-center gap-5 tracking-wider">
        {children}
      </span>
    </Link>
  );
}
