// Importing necessary React hooks
import { useEffect, useState } from "react";

// Custom hook definition that takes a URL as a parameter
const useCustomHook = (url) => {
  // State to store the fetched API data
  const [apidata, setApidata] = useState([]);
  // State to track any error that might occur during the fetch
  const [error, setError] = useState(false);

  // useEffect hook to run the fetch operation when the URL changes
  useEffect(() => {
    // Fetching data from the provided URL
    fetch(url)
      .then((response) => {
        // If the response is not OK, throw an error
        if (!response.ok) {
          throw new Error("Failed to fetch data ");
        }
        // Parse the response as JSON and return the data
        return response.json();
      })
      .then((data) => {
        // On success, store the fetched data in the state
        setApidata(data);
      })
      .catch((err) => {
        // Catch any errors during fetch or parsing
        console.log("Fetch error:", err);
        // If an error occurs, set the error state to true
        setError(true);
      });
  }, [url]); // The effect runs whenever the URL changes

  // Returning the API data and the error state
  return [apidata, error];
};

// Exporting the custom hook to be used in other components
export default useCustomHook;
