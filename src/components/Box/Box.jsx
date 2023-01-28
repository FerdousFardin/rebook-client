import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

export default function Box({ children }) {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      className="w-full h-full"
      ref={ref}
      variants={boxVariant}
      whileInView={{
        x: 0,
        opacity: [0, 0.25, 0.75, 1],
        scale: 1,
      }}
    >
      {children}
    </motion.div>
  );
}
