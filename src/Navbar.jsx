// Importing necessary modules and styles
import React from "react";
import "./App.css"; // Importing CSS for styling the navbar

// Navbar component that takes three props: handleSearch, searchitem, and handleTypeFilter
function Navbar({ handleSearch, searchitem, handleTypeFilter }) {
  // Predefined list of Pokémon types for the select dropdown
  const options = [
    "Fire",
    "Poison",
    "Flying",
    "Grass",
    "Water",
    "Bug",
    "Normal",
    "Electric",
    "Ground",
    "Fairy",
    "Fighting",
    "Psychic",
    "Rock",
    "Steel",
    "Ice",
    "Ghost",
    "Dragon",
  ];

  return (
    <>
      {/* Header section with the title */}
      <header>
        <h1>Interactive Data Explorer</h1>
      </header>

      {/* Body section containing the search input and type filter */}
      <div className="body">
        {/* Search input field */}
        <input
          placeholder="Search..." // Placeholder text for the input field
          type="text" // Defining the type as text for user input
          value={searchitem} // Value is controlled by the parent component
          onChange={handleSearch} // Calling the handleSearch function on change
        />

        {/* Dropdown for selecting Pokémon type */}
        <div>
          <select name="Types" onChange={handleTypeFilter}>
            {/* Default option for type selection */}
            <option value="">Select Type</option>
            {/* Mapping through the predefined Pokémon types and displaying them as options */}
            {options.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default Navbar;
