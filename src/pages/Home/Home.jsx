import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import Loader from "../../components/Loader/Loader";
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
      fetch(`${import.meta.env.VITE_API_URL}/products`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  useEffect(() => {
    if (products?.length) {
      const advertisedItem = products?.filter(
        (product) => product.advertised && product.inStock
      );
      setAdvertised(advertisedItem);
    }
  }, [products]);
  if (isLoading) return <Loader />;
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
