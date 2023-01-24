import React from "react";

function SmallBtn({ loading, handler, colorPref, variants }) {
  return (
    <button
      style={{
        // background: colorPref || undefined,
        color: colorPref ? colorPref : "",
        borderColor: colorPref || undefined,
      }}
      disabled={loading}
      onClick={handler}
      className={`flex text-xs bg-transparent rounded-full justify-center items-center w-auto gap-2 border-primary border focus:outline-none focus:border-primary-100 disabled:cursor-not-allowed px-4 py-2 duration-300 text-primary hover:shadow-[0px_3px_0px_0px_#231b15] hover:-translate-y-1 active:translate-y-0 active:shadow-[0px_2px_0px_0px_#231b15] ${
        colorPref ? "" : "border-primary"
      }`}
    >
      {loading && (
        <div
          className={`grid-1 my-auto h-4 w-4 border-t-transparent border-solid animate-spin rounded-full border-2`}
        ></div>
      )}
      {!loading ? variants[0] : variants[1]}
    </button>
  );
}

export default SmallBtn;
