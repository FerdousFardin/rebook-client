import { useEffect, useState } from "react";

export default function useAdmin(email) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  useEffect(() => {
    setCheckingAdmin(true);
    if (email) {
      fetch(`https://rebook-server.vercel.app/user`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
        body: JSON.stringify({ isAdmin: email }),
      })
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .finally(() => {
          setCheckingAdmin(false);
        });
    }
  }, [email]);
  return { isAdmin, checkingAdmin };
}
