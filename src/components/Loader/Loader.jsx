import { AnimatePresence, motion } from "framer-motion";
import { SpinnerCircular } from "spinners-react";
export default function Loader({ color, className }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.35 } }}
        exit={{ opacity: 0, scale: 0 }}
        className={`w-full h-screen grid place-items-center ${className}`}
      >
        <SpinnerCircular
          size={70}
          thickness={140}
          speed={140}
          color={color}
          secondaryColor="rgba(172, 57, 57, 0.17)"
        />
      </motion.div>
    </AnimatePresence>
  );
}
