import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import Advertised from "./Advertised";
import Banner from "./Banner";
import HomeCategories from "./HomeCategories";
import Offer from "./Offer";

export default function Home() {
  const [advertised, setAdvertised] = useState([]);
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["advertised"],
    queryFn: () =>
      fetch(`https://rebook-server.vercel.app/products`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  useEffect(() => {
    if (products?.length) {
      const advertisedItem = products?.filter((product) => product.advertised);
      setAdvertised(advertisedItem);
    }
  }, [products]);
  if (isLoading)
    return (
      <div className="w-full h-screen grid place-items-center">
        <SpinnerCircular />
      </div>
    );
  if (error) return;

  return (
    <>
      <Banner />
      <Offer />
      {advertised.length > 0 && <Advertised {...{ advertised }} />}
      <HomeCategories />
    </>
  );
}
