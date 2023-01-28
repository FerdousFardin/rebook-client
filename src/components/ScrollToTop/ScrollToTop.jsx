import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

function ScrollToTop({ children }) {
  const { ref: myRef, inView: mySectionVisible } = useInView();
  return (
    <section ref={myRef}>
      {children}
      {mySectionVisible && (
        <Link
          to="/#header"
          className="fixed cursor-pointer p-3 bg-gray-100 rounded-full shadow-md bottom-10 right-10 animate-bounce"
        >
          <ArrowUpIcon className="w-8 h-8" />
        </Link>
      )}
    </section>
  );
}

export default ScrollToTop;
