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
  isPlayPhase,
  cardTargetRole,
  panicCard,
}) => {
  const { clickedCard, onCardClicked, userid, isExchangePhase } =
    useContext(UserContext);

  const isDefended = target_player === userid;
  const isDefensePhase = isSomeoneBeingDefended && isDefended;
  const isTargetedExchange = isExchangePhase && isDefended ;
  let canExchangeInfected = false;
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

  const onClickedCard = ({ id, idtype, isDefenseCard }) => {
    if (panicCard === null) {
      if (
        !isCardPlaylable(
          idtype,
          isExchangePhase,
          role,
          isDefensePhase,
          canExchangeInfected,
          isPlayPhase
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
    } else {
      if (panicCard.id !== id) {
        onCardClicked(null);
      } else {
        onCardClicked({ id, idtype });
      }
    }
  };

  const isCardPlayableOnHover = ({ id, idtype, isDefenseCard }) => {
    return (
      (!isDefended &&
        !isDefenseCard &&
        isCardPlaylable(
          idtype,
          isExchangePhase,
          role,
          isDefensePhase,
          canExchangeInfected,
          isPlayPhase
        )) ||
      (isSomeoneBeingDefended &&
        isDefended &&
        isDefenseCard &&
        isCardPlaylable(
          idtype,
          isExchangePhase,
          role,
          isDefensePhase,
          canExchangeInfected,
          isPlayPhase
        )) ||
        (isExchangePhase &&
          isDefended &&
          !isSomeoneBeingDefended &&
          isCardPlaylable(
            idtype,
            isExchangePhase,
            role,
            isDefensePhase,
            canExchangeInfected,
            isPlayPhase
          )) 
    );
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
          const isClicked = clickedCard?.id === id;
          const isDefenseCard = defense.some(
            (elem) => isDefended && elem === idtype
          );

          if (role === "Infected") {
            if (idtype === 2) infectedCards++;
            if (infectedCards >= 2) {
              if (cardTargetRole === "The Thing" && isDefended) {
                canExchangeInfected = true;
              } else if (!isDefended) {
                canExchangeInfected = true;
              }
            }
          } else {
            canExchangeInfected = false;
          }

          return (
            <Box
              key={`card-hand-${id}`}
              id={`card-hand-${index}`}
              sx={{
                ...baseCardStyle,
                right: `${10 + index * 30}px`,
                "&:hover": {
                  ...(panicCard === null
                    ? isCardPlayableOnHover({ id, idtype, isDefenseCard }) &&
                      highlightedCardStyle
                    : panicCard.id === id
                    ? highlightedCardStyle
                    : {}),
                },
                ...(isClicked && highlightedCardStyle),
              }}
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
