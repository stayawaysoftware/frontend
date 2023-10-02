import React from "react";

import blue from "../assets/cards/0B.png";
import green from "../assets/cards/0G.png";
import red from "../assets/cards/0R.png";
import yellow from "../assets/cards/0Y.png";
import flamethrower from "../assets/cards/lanzallamas.jpg";
import deck from "../assets/mazo.png";

const cardAssets = {
  3   : flamethrower,
  200 : blue,
  201 : green,
  202 : red,
  203 : yellow,
};

export function IdToAsset(id) {
  const assetName = cardAssets[id];
  if (assetName === undefined) {
    return deck;
  }
  return assetName;
}