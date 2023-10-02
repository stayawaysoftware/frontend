import React from "react";
import mazo from "../GameComps/Images/mazo.png";

const Deck= () => {

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  
  return (
    <div>
      <div style={containerStyle}>
        <img
          src={mazo}
          alt="mazo"
          style={{
            width: "25%",
            height: "auto",
            position: "relative",
            userSelect: "none",
            cursor: "pointer",
            border: "none",
            right: "30%",
            bottom: "170px",
          }}
        />
      </div>
    </div>
  );
};

export default Deck;