import React, { useEffect, useState } from "react";

const useToken = ({ email }) => {
  const [token, setToken] = useState("");
  console.log(email);
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
          console.log(data);
        });
    }
  }, [email]);
  return [token];
};
export default useToken;
