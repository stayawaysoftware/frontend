import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { IdToAsset } from "../../utils/CardHandler";

const Hand = (props) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { clickedCard, setClickedCard } = useContext(UserContext);

  const baseCardStyle = {
    width: "10%",
    height: "auto",
    position: "relative",
    top: "170px",
    userSelect: "none",
    cursor: "pointer",
    border: "none",
    transition: "width 0.2s, height 0.2s", // Add transition for smooth animation
  };

  const highlightedCardStyle = {
    border: "1px groove",
  };

  const hoverCardStyle = {
    border: "1px groove",
  };

  const enlargedCardStyle = {
    width: "11%", // Adjust the width to enlarge the card
    height: "auto", // Maintain the aspect ratio
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

  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.cardList.map((cardId, index) => (
          <img
            key={index}
            src={IdToAsset(cardId)}
            alt={`${cardId + 1}`}
            style={{
              ...baseCardStyle,
              ...(selectedCard === `card${index + 1}`
                ? { ...highlightedCardStyle, ...enlargedCardStyle } // Enlarge selected card
                : {}),
              ...(hoveredCard === `card${index + 1}` ? hoverCardStyle : {}), // Apply hover style if card is hovered
              right: `${10 + index * 30}px`,
            }}
            onClick={() => handleCardClick(`card${index + 1}`)}
            onMouseEnter={() => handleCardHover(`card${index + 1}`)} // Handle mouse enter
            onMouseLeave={handleCardLeave} // Handle mouse leave
          />
        ))}
      </div>
    </div>
  );
};

export default Hand;

