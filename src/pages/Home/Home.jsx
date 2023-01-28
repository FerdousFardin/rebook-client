import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useContext } from "react";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";
import Advertised from "./Advertised";
import { Banner } from "./Banner";
import HomeCategories from "./HomeCategories";
import Offer from "./Offer";
import { motion } from "framer-motion";
import Box from "../../components/Box/Box";
import Brands from "./Brands";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Cookie from "../../components/Cookie/Cookie";

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
  if (isLoading) return <Loader color={"rgba(219, 60, 38, 1)"} />;
  if (error) {
    return;
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -15 }}
        transition={{ delay: 0.25 }}
        className="relative"
      >
        <Banner />
        <ScrollToTop>
          <Offer />

          <Box>
            {advertised.length > 0 && <Advertised {...{ advertised }} />}
          </Box>
          <Box>
            <HomeCategories />
          </Box>
        </ScrollToTop>
        <Box>
          <Brands />
        </Box>
        <Cookie />
      </motion.div>
    </>
  );
}
