import { AnimatePresence, motion } from "framer-motion";
import { SpinnerCircular } from "spinners-react";
export default function Loader() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.35 } }}
        exit={{ opacity: 0, scale: 0 }}
        className="w-full h-screen grid place-items-center"
      >
        <SpinnerCircular
          size={70}
          thickness={140}
          speed={140}
          color="rgba(219, 60, 38, 1)"
          secondaryColor="rgba(172, 57, 57, 0.17)"
        />
      </motion.div>
    </AnimatePresence>
  );
}
