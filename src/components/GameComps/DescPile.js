import React from "react";
import { IdToAsset } from "../../utils/CardHandler";

const DescPile = ({ lastCard }) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    perspective: "1000px",
  };

  return (
    <div>
      <div style={containerStyle}>
        <img
          src={IdToAsset(lastCard)}
          alt="descarte"
          style={{
            width: "24%",
            height: "auto",
            position: "relative",
            border: "none",
            right: "-20%",
            bottom: "160px",
            transform: "rotateX(25deg)",
          }}
        />
      </div>
    </div>
  );
};

export default DescPile;
