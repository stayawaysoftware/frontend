import React from "react";
import mazo from "../../assets/mazo.png";

const Deck= () => {

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
          src={mazo}
          alt="mazo"
          style={{
            width: "24%",
            height: "auto",
            position: "relative",
            userSelect: "none",
            cursor: "pointer",
            border: "none",
            right: "20%",
            bottom: "160px",
            transform: "rotateX(25deg)",
          }}
        />
      </div>
    </div>
  );
};

export default Deck;