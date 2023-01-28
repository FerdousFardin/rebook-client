import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function SecondaryBtn({ className, onClick, to, children }) {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`hover:translate-x-1 inline-flex gap-2 justify-between items-center duration-300 relative translate-z-1 z-[1]  hover:text-white group hover:bg-primary rounded-full pl-4 ease-linear  ${className}`}
    >
      {children}{" "}
      <span className="bg-primary rounded-full group-hover:bg-transparent">
        <ArrowRightIcon className="w-5 h-5 m-2 text-white" />
      </span>
    </Link>
  );
}

export default SecondaryBtn;
