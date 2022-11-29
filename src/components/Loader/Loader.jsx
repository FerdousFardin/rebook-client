import React from "react";
import { SpinnerCircular } from "spinners-react";
export default function Loader() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <SpinnerCircular
        size={70}
        thickness={140}
        speed={140}
        color="rgba(219, 60, 38, 1)"
        secondaryColor="rgba(172, 57, 57, 0.17)"
      />
    </div>
  );
}
