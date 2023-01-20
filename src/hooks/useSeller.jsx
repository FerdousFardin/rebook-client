import { useEffect, useState } from "react";

export default function useSeller(email) {
  const [checkingSeller, setCheckingSeller] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  useEffect(() => {
    if (email) {
      setCheckingSeller(true);
      fetch(
        `https://rebook-server.vercel.app/user-authorize?isSeller=${email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("rebookToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setIsSeller(data.isSeller);
        })
        .finally(() => setCheckingSeller(false));
    }
  }, [email]);
  return { checkingSeller, isSeller };
}
