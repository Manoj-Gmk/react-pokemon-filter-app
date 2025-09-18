import React, { useEffect, useState, useTransition } from "react";
import CardLayout from "./Components/CardLayout"; // Card layout component for each Pokémon card
import "./App.css"; // Importing styling for the app
import useCustomHook from "./Components/useCustomHook"; // Custom hook for fetching data
import Navbar from "./Navbar"; // Navbar component for search and filter functionality

function App() {
  // State hooks for managing input fields and filtered data
  const [searchitem, setSearchitem] = useState(""); 
  const [detailedData, setDetailedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [selectedType, setSelectedType] = useState("");
  const [isPending, startTransition] = useTransition(); 

  // Custom hook for fetching Pokémon data from API
  const [apidata, error] = useCustomHook(
    "https://pokeapi.co/api/v2/pokemon?limit=150"
  );

  let result = apidata?.results || []; 

  // Effect hook to trigger fetching of detailed Pokémon data when results are available
  useEffect(() => {
    if (result.length > 0) {
      fetchDetails();
    }
  }, [result]); 

  // Function to fetch detailed data for each Pokémon
  const fetchDetails = () => {
    Promise.all(
      result.map((pokemon) =>
        fetch(pokemon.url) 
          .then((res) => res.json()) 
          .then((data) => ({
            id: data.id,
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default, 
            type: data.types.map((t) => t.type.name).join(","),
          }))
      )
    )
      .then((allData) => {
        setDetailedData(allData);
        setFilteredData(allData); 
      })
      .catch((err) => {
        console.error("Failed to fetch details:", err); 
        setFilteredData([]); 
      });
  };

  // Function to handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchitem(value); 

    // Start a transition to filter the data without blocking UI updates
    startTransition(() => {
      setFilteredData([]);
      // Filter the data based on the search term and selected type
      const filtered = detailedData.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) && 
          (selectedType === "" ||
            item.type.includes(selectedType.toLowerCase())) 
      );
      setFilteredData(filtered); 
    });
  };

  // Function to handle type filter selection changes
  const handleTypeFilter = (e) => {
    const type = e.target.value; 
    setSelectedType(type); 

    // Start a transition to filter the data without blocking UI updates
    startTransition(() => {
      setFilteredData([]); 
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
      <Navbar
        handleSearch={handleSearch} // Pass the search handler to Navbar
        searchitem={searchitem} // Pass the search term to Navbar
        handleTypeFilter={handleTypeFilter} // Pass the type filter handler to Navbar
      />
      {isPending ? (
        <h2>Loading...</h2>
      ) : (
        <div className="grid-container">
          {/* Display each filtered Pokémon data using the CardLayout component */}
          {filteredData.map((poke, index) => (
            <CardLayout
              key={index} 
              name={poke.name} 
              image={poke.image} 
              type={poke.type} 
              id={poke.id}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
