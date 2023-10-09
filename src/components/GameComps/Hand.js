import React, { useEffect, useState, useContext } from "react";

import { Box } from "@mui/material";

import { UserContext } from "../../contexts/UserContext";
import { IdToAsset } from "../../utils/CardHandler";

const Hand = (props) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const { clickedCard, setClickedCard } = useContext(UserContext);

  const baseCardStyle = {
    width: "10%",
    height: "auto",
    position: "relative",
    userSelect: "none",
    cursor: "pointer",
    border: "none",
  };

  const highlightedCardStyle = {
    border: "1px groove",
    borderRadius: "15px",
    transform: "scale(1.1)",
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
  console.log({ selectedCard });
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
          <Box
            key={`card-hand-${cardId}`}
            sx={[
              selectedCard === cardId && highlightedCardStyle,
              {
                ...baseCardStyle,
                right: `${10 + index * 30}px`,
                "&:hover": {
                  ...highlightedCardStyle,
                },
              },
            ]}
            onClick={() => handleCardClick(cardId)}
          >
            <img
              src={IdToAsset(cardId)}
              alt={`${cardId + 1}`}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
        ))}
      </div>
    </div>
  );
};

export default Hand;
