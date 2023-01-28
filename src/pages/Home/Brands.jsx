import React from "react";
import { brandLogos } from "../../data/brandLogos";

function Brands() {
  return (
    <div className="px-28 my-24 py-24 bg-primary-100">
      <h1 className="text-center text-3xl sm:text-2xl md:text-[2.5625rem] lg:text-4xl mb-20 text-gray-100">
        You’ll be in good company
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:flex justify-between items-center">
        {brandLogos.map((logo, idx) => (
          <span key={idx}>{logo}</span>
        ))}
      </div>
    </div>
  );
}

export default Brands;
