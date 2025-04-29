// Importing necessary modules and components
import React, { useEffect, useState, useTransition } from "react";
import CardLayout from "./Components/CardLayout"; // Card layout component for each Pokémon card
import "./App.css"; // Importing styling for the app
import useCustomHook from "./Components/useCustomHook"; // Custom hook for fetching data
import Navbar from "./Navbar"; // Navbar component for search and filter functionality

function App() {
  // State hooks for managing input fields and filtered data
  const [searchitem, setSearchitem] = useState(""); // Holds search input for Pokémon name
  const [detailedData, setDetailedData] = useState([]); // Holds the detailed Pokémon data
  const [filteredData, setFilteredData] = useState([]); // Holds the filtered data after search or filter
  const [selectedType, setSelectedType] = useState(""); // Holds the selected Pokémon type for filtering
  const [isPending, startTransition] = useTransition(); // Hook for managing state updates that involve transitions (e.g., filtering)

  // Custom hook for fetching Pokémon data from API
  const [apidata, error] = useCustomHook(
    "https://pokeapi.co/api/v2/pokemon?limit=150" // API endpoint to fetch first 150 Pokémon
  );

  let result = apidata?.results || []; // Grabbing the Pokémon list (or empty if no data)

  // Effect hook to trigger fetching of detailed Pokémon data when results are available
  useEffect(() => {
    if (result.length > 0) {
      fetchDetails(); // Fetch the detailed data for each Pokémon
    }
  }, [result]); // Dependency array ensures this effect runs when result changes

  // Function to fetch detailed data for each Pokémon
  const fetchDetails = () => {
    Promise.all(
      result.map((pokemon) =>
        fetch(pokemon.url) // Fetching each Pokémon's detailed data using its URL
          .then((res) => res.json()) // Parse the response as JSON
          .then((data) => ({
            id: data.id, // Pokémon ID
            name: data.name, // Pokémon name
            image: data.sprites.other["official-artwork"].front_default, // Pokémon image
            type: data.types.map((t) => t.type.name).join(","), // Types as a comma-separated string
          }))
      )
    )
      .then((allData) => {
        setDetailedData(allData); // Set the fetched detailed data to state
        setFilteredData(allData); // Initialize filtered data with all the fetched data
      })
      .catch((err) => {
        console.error("Failed to fetch details:", err); // Log any errors
        setFilteredData([]); // Set filtered data to empty in case of error
      });
  };

  // Function to handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value; // Get the search input value
    setSearchitem(value); // Update the search state

    // Start a transition to filter the data without blocking UI updates
    startTransition(() => {
      setFilteredData([]); // Clear the existing filtered data
      // Filter the data based on the search term and selected type
      const filtered = detailedData.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) && // Match the name
          (selectedType === "" ||
            item.type.includes(selectedType.toLowerCase())) // Match the type if any
      );
      setFilteredData(filtered); // Set the filtered data
    });
  };

  // Function to handle type filter selection changes
  const handleTypeFilter = (e) => {
    const type = e.target.value; // Get the selected type value
    setSelectedType(type); // Update the selected type state

    // Start a transition to filter the data without blocking UI updates
    startTransition(() => {
      setFilteredData([]); // Clear the existing filtered data
      // Filter the data based on the current search and selected type
      const filtered = detailedData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchitem.toLowerCase()) && // Match the search term
          (type === "" || item.type.includes(type.toLowerCase())) // Match the selected type if any
      );
      setFilteredData(filtered); // Set the filtered data
    });
  };

  // If there's an error fetching the data, display a 404 error message
  if (error) {
    return <h2> 404 - Page Not Found or API Error: {error}</h2>;
  }

  // Main JSX for rendering the app
  return (
    <>
      {/* Navbar with search and filter options */}
      <Navbar
        handleSearch={handleSearch} // Pass the search handler to Navbar
        searchitem={searchitem} // Pass the search term to Navbar
        handleTypeFilter={handleTypeFilter} // Pass the type filter handler to Navbar
      />

      {/* Show loading text if data is still pending */}
      {isPending ? (
        <h2>Loading...</h2>
      ) : (
        <div className="grid-container">
          {/* Display each filtered Pokémon data using the CardLayout component */}
          {filteredData.map((poke, index) => (
            <CardLayout
              key={index} // Use index as a key for each card
              name={poke.name} // Pass Pokémon name
              image={poke.image} // Pass Pokémon image
              type={poke.type} // Pass Pokémon types
              id={poke.id} // Pass Pokémon ID
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
