import React from "react";
import { IdToAsset } from "../../utils/CardHandler";

const DescPile = ({ lastCard }) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      <div style={containerStyle}>
        <img
          src={IdToAsset(lastCard)}
          alt="descarte"
          style={{
            width: "25%",
            height: "auto",
            position: "relative",
            border: "none",
            right: "-20%",
            bottom: "170px",
          }}
        />
      </div>
    </div>
  );
};

export default DescPile;
