import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useContext } from "react";

import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";
import Advertised from "./Advertised";
import Banner from "./Banner";
import HomeCategories from "./HomeCategories";
import Offer from "./Offer";

export default function Home() {
  const { logoutUser } = useContext(AuthContext);
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
      }).then((res) => {
        if (res.status !== 400 || res.status !== 403 || res.status !== 401)
          return res.json();
        else {
          logoutUser();
          console.log("Fariha");
        }
      }),
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
  if (error) {
    return;
  }
  return (
    <>
      <Banner />
      <Offer />
      {advertised.length > 0 && <Advertised {...{ advertised }} />}
      <HomeCategories />
    </>
  );
}
