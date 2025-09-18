import React from "react";
import "./CardLayout.css";

function CardLayout({ name, image, type, id }) {
  return (
    <>
      <div className="card">
        <h2>{name}</h2>
        <img src={image} className="card-image" alt={`Image of ${name}`} />
        <h3>{type}</h3>
        <h4>{id}</h4>
      </div>
    </>
  );
}

export default CardLayout;
