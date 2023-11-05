import { useContext } from "react";

import { Box } from "@mui/material";

import { UserContext } from "../../contexts/UserContext";
import { IdToAsset, isCardPlaylable } from "../../utils/CardHandler";

const Hand = ({
  cardList = [],
  defense,
  target_player,
  isSomeoneBeingDefended,
  role,
}) => {
  const { clickedCard, onCardClicked, userid, isExchangePhase } =
    useContext(UserContext);

  const isDefended = target_player === userid;
  const isDefensePhase = isSomeoneBeingDefended && isDefended;
  let canExchangeInfected = false; // si el rol es infectado, tiene q tener al menos de cartas de Infected
  let infectedCards = 0;

  const baseCardStyle = {
    width: "10%",
    height: "auto",
    position: "relative",
    userSelect: "none",
    cursor: "pointer",
    border: "none",
  };

  const highlightedCardStyle = {
    border: "1px groove",
    borderRadius: "15px",
    transform: "scale(1.1)",
  };

  const auraStyle = {
    boxShadow: "2px 2px 4px #FFFFF",
  };

  const onClickedCard = ({ id, idtype, isDefenseCard }) => {
    console.log("isExchangePhase: ", isExchangePhase);
    if (
      !isCardPlaylable(
        idtype,
        isExchangePhase,
        role,
        isDefensePhase,
        canExchangeInfected
      )
    ) {
      onCardClicked(null);
    } else {
      if (isSomeoneBeingDefended) {
        if (isDefended && isDefenseCard) {
          onCardClicked({ id, idtype });
        } else {
          onCardClicked(null);
        }
      } else {
        onCardClicked({ id, idtype });
      }
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id="hand"
      >
        {cardList?.map(({ id, idtype }, index) => {
          const isDefenseCard = defense.some(
            (elem) => isDefended && elem === idtype
          );
          if (role === "Infected") {
            if (idtype === 2) infectedCards++;
            if (infectedCards >= 2) canExchangeInfected = true;
          }
          return (
            <Box
              key={`card-hand-${id}`}
              id={`card-hand-${index}`}
              sx={[
                clickedCard?.id === id &&
                  !isCardPlaylable(
                    idtype,
                    isExchangePhase,
                    role,
                    isDefensePhase,
                    canExchangeInfected
                  ) &&
                  (isSomeoneBeingDefended
                    ? isDefended && isDefenseCard
                      ? highlightedCardStyle
                      : false
                    : highlightedCardStyle),
                {
                  ...baseCardStyle,
                  right: `${10 + index * 30}px`,
                  "&:hover": {
                    ...(!isCardPlaylable(
                      idtype,
                      isExchangePhase,
                      role,
                      isDefensePhase,
                      canExchangeInfected
                    )
                      ? {}
                      : isSomeoneBeingDefended
                      ? isDefended && isDefenseCard
                        ? highlightedCardStyle
                        : {}
                      : highlightedCardStyle),
                    ...(isDefenseCard && auraStyle),
                  },
                  ...(isDefenseCard && auraStyle),
                },
              ]}
              onClick={() => onClickedCard({ id, idtype, isDefenseCard })}
            >
              <img
                src={IdToAsset(idtype)}
                alt={`${idtype + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default Hand;
