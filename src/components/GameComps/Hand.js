import React from "react";

import { useState } from "react";

const Hand = (props) => {
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
    top: "170px",
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
        {props.cardList.map((card, index) => (
          <img
            key={index}
            src={card}
            alt={`card${index + 1}`}
            style={{
              ...baseCardStyle,
              ...(selectedCard === `card${index + 1}` ? highlightedCardStyle : {}),
              right: `${10 + index * 30}px`, 
            }}
            onClick={() => handleCardClick(`card${index + 1}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hand;
