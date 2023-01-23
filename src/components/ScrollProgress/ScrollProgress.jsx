import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="fixed top-25 left-0 right-0 h-1 bg-primary origin-[0%] z-50"
      style={{ scaleX }}
    ></motion.div>
  );
}

export default ScrollProgress;
