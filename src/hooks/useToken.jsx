import React, { useEffect, useState } from "react";

const useToken = ({ email }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToken(data);
          localStorage.setItem("rebookToken", data.token);
        });
    }
  }, [email]);
  return [token];
};
export default useToken;
