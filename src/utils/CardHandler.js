import React from "react";

import blue from "../assets/cards/0B.png";
import green from "../assets/cards/0G.png";
import red from "../assets/cards/0R.png";
import yellow from "../assets/cards/0Y.png";
import flamethrower from "../assets/cards/lanzallamas.png";
import deck from "../assets/mazo.png";

const cardAssets = {
  3   : flamethrower,
  200 : blue,
  201 : green,
  202 : red,
  203 : yellow,
};

export function IdToAsset(id) {
  // const assetName = cardAssets[id];
    // if (!assetName) {
  //   return deck;
  // }
  if (id === 3) {
    return flamethrower;
  }
  else if (id > 4 && id < 10) {
    return  blue;
  }
  else if (id > 10 && id < 16) {
    return green;
  }
  else if (id > 16 && id < 22) {
    return yellow;
  }
  else {
    return red;
  }
}

const cardTargets = {
  3 : true,
}

export function CardHasTarget(id) {
  //this function checks if a card has a target
  //for the moment, only the flamethrower has a target
  // console.log("la id es", id);
  return cardTargets[id];
  
}
