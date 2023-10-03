import React from "react";
import { IdToAsset } from "../../utils/CardHandler";

const DescPile = (props) => {


  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      <div style={containerStyle}>
          <img
            src={IdToAsset(props.lastCard)}
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
}

export default DescPile;