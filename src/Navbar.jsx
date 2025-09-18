import React from "react";
import "./App.css"; 

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
      <header>
        <h1>Interactive Data Explorer</h1>
      </header>
      <div className="body">
        {/* Search input field */}
        <input
          placeholder="Search..." 
          type="text" 
          value={searchitem} 
          onChange={handleSearch} 
        />

        {/* Dropdown for selecting Pokémon type */}
        <div>
          <select name="Types" onChange={handleTypeFilter}>
            <option value="">Select Type</option>
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
