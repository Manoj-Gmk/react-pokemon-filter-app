import { useEffect, useState } from "react";

const useCustomHook = (url) => {
  const [apidata, setApidata] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data ");
        }
        return response.json();
      })
      .then((data) => {
        setApidata(data);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setError(true);
      });
  }, [url]); 
  return [apidata, error];
};

export default useCustomHook;
