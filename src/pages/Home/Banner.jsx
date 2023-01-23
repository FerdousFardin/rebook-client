import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import PrimaryBtn from "../../components/Buttons/PrimaryBtn";
import { motion } from "framer-motion";
import { sectionVariants } from "../../../utility/sectionVariants";

export default function Banner() {
  return (
    <motion.section
      id="home"
      className="relative bg-[url(https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)] bg-cover bg-center bg-no-repeat"
      // initial={{
      //   opacity: 0,
      //   y: "100%",
      // }}
      // animate={{
      //   opacity: 1,
      //   y: 0,
      // }}
      // exit={{ opacity: 0, y: "-100%" }}
      // transition={{ delay: 0.15 }}
    >
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-primary/25 sm:to-white/25"></div>

      <motion.div
        className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
        // initial="offscreen"
        // whileInView="onscreen"
        // viewport={{ once: true, amount: 0.8 }}
      >
        <div className="max-w-xl text-center sm:text-left">
          <motion.h1
            variants={sectionVariants}
            className="text-3xl font-extrabold sm:text-5xl"
          >
            Knowledge is
            <strong className="block font-extrabold text-primary">
              Strength.
            </strong>
          </motion.h1>

          <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed text-gray-600">
            Buy and sell your used books at the best price
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <PrimaryBtn className={"sm:w-max h-12 w-full"} to={`/#categories`}>
              Explore Now <ShoppingCartIcon className="w-6 h-6" />
            </PrimaryBtn>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
