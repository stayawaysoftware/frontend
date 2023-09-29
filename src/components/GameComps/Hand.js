import React from "react";
import card1 from "../GameComps/Cards/0B.png";
import card2 from "../GameComps/Cards/0G.png";
import card3 from "../GameComps/Cards/0R.png";
import card4 from "../GameComps/Cards/0Y.png";

const Hand = () => {
    const imageStyle = {
        width: '75px', // Set your desired width
        height: '100px', // Set your desired height
        position: 'relative', // Set the position property to 'absolute'
        top: '450px', // Set the top position in pixels
    };

    return (
        <div>
            <div>
                <img src={card1} alt="card1" style={imageStyle} />
                <img src={card2} alt="card2" style={imageStyle} />
                <img src={card3} alt="card3" style={imageStyle} />
                <img src={card4} alt="card4" style={imageStyle} />
            </div>
        </div>
    );
};

export default Hand;