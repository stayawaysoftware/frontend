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

export function IdToNameCard(card) {
  const cardAssets = {
    1: "La Cosa",
    2: "Infectado",
    3: "Lanzallamas",
    4: "Análisis",
    5: "Hacha",
    6: "Sospecha",
    7: "Determinación",
    8: "Whisky",
    9: "Cambio de posición",
    10: "Cuidado con la espalda",
    11: "Seducción",
    12: "Mas vale que corras",
    13: "Estoy bien aquí",
    14: "Aterrador",
    15: "No gracias",
    16: "Fallaste",
    17: "No hay barbacoas",
    18: "Cuarentena",
    19: "Puerta cerrada",
    20: "Revelaciones",
    21: "Cuerdas podridas",
    22: "Sal de aquí",
    23: "Olvidadizo",
    24: "Uno dos",
    25: "Tres cuatro",
    26: "¿Es la fiesta aquí?",
    27: "Que quede entre nosotros",
    28: "Turno y turno",
    29: "¿No podemos ser amigos?",
    30: "Cita a ciegas",
    31: "Ups",
  };

  const assetName = cardAssets[card.idtype];
  if (!assetName) {
    return "Nada";
  }

  return assetName;
}

export const CntTarget = Object.freeze({
  NONE: 0,
  ADJACENT: 1,
  ALL: 2,
  THE_THING: 3,
});

const cardTargets = {
  1: CntTarget.NONE,
  2: CntTarget.THE_THING,
  3: CntTarget.ADJACENT,
  4: CntTarget.ADJACENT,
  5: CntTarget.ADJACENT, // hacha: a vos mismo o adjacente
  6: CntTarget.ADJACENT,
  7: CntTarget.NONE,
  8: CntTarget.NONE,
  9: CntTarget.ADJACENT,
  10: CntTarget.NONE,
  11: CntTarget.ALL,
  12: CntTarget.ALL,
  13: CntTarget.NONE,
  14: CntTarget.NONE,
  15: CntTarget.NONE,
  16: CntTarget.NONE,
  17: CntTarget.NONE,
  18: CntTarget.ADJACENT,
  19: CntTarget.ADJACENT,
  20: CntTarget.NONE,
  21: CntTarget.NONE,
  22: CntTarget.ALL,
  23: CntTarget.NONE,
  24: CntTarget.ADJACENT,
  25: CntTarget.NONE,
  26: CntTarget.NONE,
  27: CntTarget.ADJACENT,
  28: CntTarget.NONE,
  29: CntTarget.ALL,
  30: CntTarget.NONE,
  31: CntTarget.NONE,
};

export function CardHasTarget(id) {
  return cardTargets[id];
}

export function isCardPlaylable(
  idtype,
  isExchangePhase,
  role,
  isDefensePhase,
  canExchangeInfected,
  isPlayPhase
) {
  let isPlaylable = false;
  const cardAssets = {
    1: false,
    2:
      (isExchangePhase &&
        (role === "The Thing" ||
          (role === "Infected" && canExchangeInfected))) ||
      isPlayPhase,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: isDefensePhase || isExchangePhase || isPlayPhase,
    14: isDefensePhase || isExchangePhase || isPlayPhase,
    15: isDefensePhase || isExchangePhase || isPlayPhase,
    16: isDefensePhase || isExchangePhase || isPlayPhase,
    17: isDefensePhase || isExchangePhase || isPlayPhase,
    18: true,
    19: true,
    20: true,
    21: true,
    22: true,
    23: true,
    24: true,
    25: true,
    26: true,
    27: true,
    28: true,
    29: true,
    30: true,
    31: true,
  };

  isPlaylable = cardAssets[idtype];

  return isPlaylable;
}
