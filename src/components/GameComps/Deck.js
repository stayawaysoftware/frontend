import React from "react";
import mazo from "../GameComps/Images/mazo.png";
import { useState } from "react";
//import { UserContext } from "../../contexts/UserContext";

const Deck= () => {
  const [selectedDeck, setSelectedDeck] = useState(null);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const baseCardStyle = {
    width: "35%",
    height: "auto",
    position: "relative",
    userSelect: "none",
    cursor: "pointer",
    border: "none",
    right: "30%",
    bottom: "190px",
  };

  const highlightedDeckStyle = {
    border: "1px groove",
  };

  const handleDeckClick = (Deck) => {
    if (selectedDeck === Deck) {
      setSelectedDeck(null);
    } else {
      setSelectedDeck(Deck);
    }
  };

  return (
    <div>
      <div style={containerStyle}>
        <img
          src={mazo}
          alt="mazo"
          style={{
            ...baseCardStyle,
            ...(selectedDeck === "mazo" ? highlightedDeckStyle : {}),
          }}
          onClick={() => handleDeckClick("mazo")}
        />
      </div>
    </div>
  );
};

export default Deck;