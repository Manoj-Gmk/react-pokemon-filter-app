// Importing the necessary CSS file for styling the CardLayout component
import React from "react";
import "./CardLayout.css";

// CardLayout component definition
function CardLayout({ name, image, type, id }) {
  return (
    <>
      {/* A div that represents a single card displaying Pokémon details */}
      <div className="card">
        {/* Display the name of the Pokémon as a heading (h2) */}
        <h2>{name}</h2>
        {/* Display the image of the Pokémon with a class for styling */}
        <img src={image} className="card-image" alt={`Image of ${name}`} />
        {/* Display the type of the Pokémon as a subheading (h3) */}
        <h3>{type}</h3>
        {/* Display the ID of the Pokémon as a subheading (h4) */}
        <h4>{id}</h4>
      </div>
    </>
  );
}

// Exporting the CardLayout component for use in other parts of the app
export default CardLayout;
