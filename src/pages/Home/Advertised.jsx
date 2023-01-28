import { Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import incrementIdx, { placeholders } from "../../../utility/incrementIdx";
import SecondaryBtn from "../../components/SecondaryBtn/SecondaryBtn";

export default function Advertised({ advertised }) {
  const [idx, setIdx] = useState(0);
  const [selectedBook, setSelectedBook] = useState(advertised[idx]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIdx(incrementIdx({ idx, length: advertised.length }));
      setSelectedBook(advertised[idx]);
    }, 7000);
    return () => clearInterval(intervalId);
  }, [idx]);
  const motionDiv = (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0.3, scale: 0.2, transitionDuration: 0.3 }}
      className="lg:min-h-[450px] lg:w-1/2 border rounded-md border-[#e6e6e6] duration-200 sm:flex gap-2 p-2"
    >
      <img
        src={selectedBook.img}
        className="sm:h-full h-60 object-scale-down w-full sm:w-2/5"
        alt=""
      />
      <div className="leading-7 flex flex-col py-10 w-full">
        <motion.h1 className="text-2xl text-primary">
          {selectedBook.name}
        </motion.h1>
        <h3 className="text-lg text-gray-400">{selectedBook.writer}</h3>
        <p className="mt-5 tracking-wider w-full">
          {selectedBook.description && selectedBook.description.length > 10
            ? ""
            : placeholders}
          {selectedBook.description}
          ...
        </p>
        <div className="flex items-center my-5 justify-between px-5 justify-self-end h-full ">
          <h1 className="text-3xl sm:text-2xl lg:text-4xl text-gray-900">
            ${selectedBook.resalePrice}
          </h1>
          <SecondaryBtn to={`/item/${selectedBook._id}`}>See more</SecondaryBtn>
        </div>
      </div>
    </motion.div>
  );
  const change = (id, index) => {
    setSelectedBook({});
    setTimeout(() => {
      const newSelect = advertised.find((i) => i._id === id);
      setSelectedBook(newSelect);
    }, 250);
    setIdx(index);
  };
  return (
    <div className="lg:px-28 py-16">
      <div className="xl:container m-auto px-6 text-gray-500 md:px-12">
        <div>
          <h2 className="mt-4 text-center text-gray-900 text-3xl lg:text-5xl md:text-4xl sm:text-2xl dark:text-white">
            Most Popular Books
          </h2>
          <h5 className="text-center mt-5 lg:text-2xl md:text-xl text-lg  sm:leading-relaxed text-gray-800">
            Check out this week's latest trends.
          </h5>
        </div>
        <div className="flex sm:gap-10 justify-center my-10 sm:flex-col lg:flex-row">
          <AnimatePresence>{motionDiv}</AnimatePresence>
          <div className="lg:w-1/2 sm:grid sm:grid-cols-4 lg:grid-cols-3 gap-4 hidden">
            {advertised.map((item, idx) => (
              <img
                key={item._id}
                className={`h-44 lg:h-52 w-36 lg:w-40 object-cover rounded cursor-pointer duration-300 hover:shadow-[0px_0px_2px_2px_#d43621] ${
                  selectedBook._id === item._id
                    ? "shadow-[0px_0px_2px_4px_#db3c26]"
                    : ""
                }`}
                src={item.img}
                alt=""
                onClick={() => change(item._id, idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
