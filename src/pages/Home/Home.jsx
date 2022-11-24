import React from "react";
import Advertised from "./Advertised";
import Banner from "./Banner";
import HomeCategories from "./HomeCategories";
import Offer from "./Offer";

export default function Home() {
  const advertised = "";
  return (
    <>
      <Banner />
      <Offer />
      {advertised && <Advertised />}
      <HomeCategories />
    </>
  );
}
