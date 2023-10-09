import { useState, useContext } from "react";

import { Box } from "@mui/material";

import { UserContext } from "../../contexts/UserContext";
import { IdToAsset } from "../../utils/CardHandler";

const Hand = ({ cardList = [] }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const { setClickedCard } = useContext(UserContext);

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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cardList?.map(({ id, idtype }, index) => (
          <Box
            key={`card-hand-${id}`}
            sx={[
              selectedCard === id && highlightedCardStyle,
              {
                ...baseCardStyle,
                right: `${10 + index * 30}px`,
                "&:hover": {
                  ...highlightedCardStyle,
                },
              },
            ]}
            onClick={() => handleCardClick(id)}
          >
            <img
              src={IdToAsset(idtype)}
              alt={`${idtype + 1}`}
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
