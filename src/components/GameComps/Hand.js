import { useState, useContext } from "react";

import { Box } from "@mui/material";

import { UserContext } from "../../contexts/UserContext";
import { IdToAsset } from "../../utils/CardHandler";

const Hand = ({ cardList = [], defense, target_player}) => {
  const { clickedCard, onCardClicked, userid} = useContext(UserContext);

  const isDefended = target_player === userid;

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

  const auraStyle = {
    boxShadow: "2px 2px 4px #FFFFF", 
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id="hand"
      >
        {cardList?.map(({ id, idtype }, index) => {
          const isDefenseCard = defense.some(({defenseId, defenseType}) => isDefended && defenseId === id && defenseType === idtype);
          console.log("isDefenseCard:", isDefenseCard);
          console.log("defense:", defense);
          console.log("cardList:", cardList); 
          console.log("idtype:", idtype);
          return (
            <Box
              key={`card-hand-${id}`}
              id={`card-hand-${index}`}
              sx={[
                clickedCard?.id === id && highlightedCardStyle,
                {
                  ...baseCardStyle,
                  right: `${10 + index * 30}px`,
                  "&:hover": {
                    ...highlightedCardStyle,
                    ...(isDefenseCard ? auraStyle : {}),
                  },
                  ...(isDefenseCard ? auraStyle : {}), 
                },
              ]}
              onClick={() => onCardClicked({ id, idtype })}
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
          );
        })}
      </div>
    </div>
  );
};

export default Hand;