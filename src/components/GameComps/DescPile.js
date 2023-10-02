import React from "react";
import { IdToAsset } from "../../utils/CardHandler";

const DescPile = (props) => {
  const descPileWithLastCard = [...props.descPile, props.lastCard];

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      <div style={containerStyle}>
        {descPileWithLastCard.map((cardId, index) => (
          <img
            key={index}
            src={IdToAsset(cardId)}
            alt={`${cardId + 1}`}
            style={{
              width: "25%",
              height: "auto",
              position: "relative",
              border: "none",
              right: "-20%",
              bottom: "170px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default DescPile;