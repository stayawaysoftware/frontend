import React from "react";
import card1 from "../GameComps/Cards/0B.png";
import card2 from "../GameComps/Cards/0G.png";
import card3 from "../GameComps/Cards/0R.png";
import card4 from "../GameComps/Cards/0Y.png";
import { useState } from "react";

const Hand = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const baseCardStyle = {
    width: "10%",
    height: "auto",
    position: "relative",
    top: "220px",
    userSelect: "none",
    cursor: "pointer",
    border: "none",
  };

  const highlightedCardStyle = {
    border: "1px groove",
  };

  const handleCardClick = (cardId) => {
    if (selectedCard === cardId) {
      setSelectedCard(null);
    } else {
      setSelectedCard(cardId);
    }
  };

  return (
    <div>
      <div style={containerStyle}>
        <img
          src={card1}
          alt="card1"
          style={{
            ...baseCardStyle,
            ...(selectedCard === "card1" ? highlightedCardStyle : {}),
            left: "10px",
          }}
          onClick={() => handleCardClick("card1")}
        />
        <img
          src={card2}
          alt="card2"
          style={{
            ...baseCardStyle,
            ...(selectedCard === "card2" ? highlightedCardStyle : {}),
            right: "20px",
          }}
          onClick={() => handleCardClick("card2")}
        />
        <img
          src={card3}
          alt="card3"
          style={{
            ...baseCardStyle,
            ...(selectedCard === "card3" ? highlightedCardStyle : {}),
            right: "50px",
          }}
          onClick={() => handleCardClick("card3")}
        />
        <img
          src={card4}
          alt="card4"
          style={{
            ...baseCardStyle,
            ...(selectedCard === "card4" ? highlightedCardStyle : {}),
            right: "80px",
          }}
          onClick={() => handleCardClick("card4")}
        />
      </div>
    </div>
  );
};

export default Hand;
