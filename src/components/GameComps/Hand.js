import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Hand = (props) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const { clickedCard, setClickedCard } = useContext(UserContext);

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
      setClickedCard(null);
    } else {
      setSelectedCard(cardId);
      setClickedCard(cardId);
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
            onClick={() => handleCardClick(`${card}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hand;
