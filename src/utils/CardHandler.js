import React from "react";

import blue from "../assets/cards/0B.png";
import green from "../assets/cards/0G.png";
import red from "../assets/cards/0R.png";
import yellow from "../assets/cards/0Y.png";
import flamethrower from "../assets/cards/lanzallamas.png";
import deck from "../assets/mazo.png";

import TheThing from "../assets/cards/01_TheThing.png";
import Infected from "../assets/cards/02_Infected.png";
import Flamethrower from "../assets/cards/03_Flamethrower.png";
import Analysis from "../assets/cards/04_Analysis.png";
import Axe from "../assets/cards/05_Axe.png";
import Suspicion from "../assets/cards/06_Suspicion.png";
import Determination from "../assets/cards/07_Determination.png";
import Whisky from "../assets/cards/08_Whisky.png";
import ChangeOfPosition from "../assets/cards/09_ChangeOfPosition.png";
import WatchYourBack from "../assets/cards/10_WatchYourBack.png";
import Seduction from "../assets/cards/11_Seduction.png";
import YouBetterRun from "../assets/cards/12_YouBetterRun.png";
import ImFineHere from "../assets/cards/13_ImFineHere.png";
import Terrifying from "../assets/cards/14_Terrifying.png";
import NoThanks from "../assets/cards/15_NoThanks.png";
import YouFailed from "../assets/cards/16_YouFailed.png";
import NoBarbecues from "../assets/cards/17_NoBarbecues.png";
import Quarantine from "../assets/cards/18_Quarantine.png";
import LockedDoor from "../assets/cards/19_LockedDoor.png";
import Revelations from "../assets/cards/20_Revelations.png";
import RottenRopes from "../assets/cards/21_RottenRopes.png";
import GetOutOfHere from "../assets/cards/22_GetOutOfHere.png";
import Forgetful from "../assets/cards/23_Forgetful.png";
import OneTwo from "../assets/cards/24_OneTwo.png";
import ThreeFour from "../assets/cards/25_ThreeFour.png";
import IsThePartyHere from "../assets/cards/26_IsThePartyHere.png";
import LetItStayBetweenUs from "../assets/cards/27_LetItStayBetweenUs.png";
import TurnAndTurn from "../assets/cards/28_TurnAndTurn.png";
import CantWeBeFriends from "../assets/cards/29_CantWeBeFriends.png";
import BlindDate from "../assets/cards/30_BlindDate.png";
import Ups from "../assets/cards/31_Ups.png";

export function IdToAsset(id) {
  const cardAssetsPath = "../assets/cards/";

  const cardAssets = {
    1: TheThing,
    2: Infected,
    3: Flamethrower,
    4: Analysis,
    5: Axe,
    6: Suspicion,
    7: Determination,
    8: Whisky,
    9: ChangeOfPosition,
    10: WatchYourBack,
    11: Seduction,
    12: YouBetterRun,
    13: ImFineHere,
    14: Terrifying,
    15: NoThanks,
    16: YouFailed,
    17: NoBarbecues,
    18: Quarantine,
    19: LockedDoor,
    20: Revelations,
    21: RottenRopes,
    22: GetOutOfHere,
    23: Forgetful,
    24: OneTwo,
    25: ThreeFour,
    26: IsThePartyHere,
    27: LetItStayBetweenUs,
    28: TurnAndTurn,
    29: CantWeBeFriends,
    30: BlindDate,
    31: Ups,
  };

  const assetName = cardAssets[id];
  if (!assetName) {
    return deck;
  }

  return assetName;
}

const cardTargets = {
  3: true,
};

export function CardHasTarget(id) {
  //this function checks if a card has a target
  //for the moment, only the flamethrower has a target
  // console.log("la id es", id);
  return cardTargets[id];
}
