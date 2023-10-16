import { Box } from "@mui/material";
import { IdToAsset } from "../../utils/CardHandler";

const OpponentHand = ({ cardList = [] }) => {
  const baseCardStyle = {
    width: "10%",
    height: "auto",
    position: "center",
    userSelect: "none",
    border: "none",
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
        {cardList?.map(({ id, idtype }, index) => (
          <Box
            key={`card-hand-${id}`}
            id={`card-hand-${index}`}
            sx={[
              {
                ...baseCardStyle,
                right: `${10 + index * 30}px`,
              },
            ]}
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
        ))}
      </div>
    </div>
  );
};

export default OpponentHand;
