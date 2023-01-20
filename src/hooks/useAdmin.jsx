import { useEffect, useState } from "react";

export default function useAdmin(email) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  useEffect(() => {
    if (email) {
      setCheckingAdmin(true);
      fetch(`${import.meta.env.VITE_API_URL}/user-authorize?isAdmin=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
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
