import React from "react";
import { Dialog, DialogTitle, Typography } from "@mui/material";
import OpponentHand from "./OpponentHand";

export default function OpponentHandDialog({
  open,
  onClose,
  cardList = [],
  opponentName,
}) {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          position: "relative",
          left: "30%",
          marginTop: "-30%",
        },
      }}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle>
        <Typography variant="h5" align="center" color="white">
          Mano de {opponentName}
        </Typography>
      </DialogTitle>
      <OpponentHand style={{ alignContent: "center" }} cardList={cardList} />
    </Dialog>
  );
}
