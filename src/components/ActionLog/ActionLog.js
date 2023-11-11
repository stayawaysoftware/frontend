import React, { useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@mui/material/Drawer";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DeleteIcon from "@mui/icons-material/Delete";
import { IdToAsset } from "../../utils/CardHandler";

// a este modulo le llega una lista de acciones y las muestra en un drawer

//listOfActions es un arreglo de tuplas {Nombre, Carta, Nombre}
// const listOfActions = [
//   { name1: "Jugador1", action: 3, name2: "Jugador2" },
//   { name1: "gere", action: 3, name2: "Jugador2" },
//   { name1: "Benja", action: 8, name2: null },
//   { name1: "Player", action: "exchange", name2: "Jugador2" },
//   { name1: "Jugador1", action: "new_turn", name2: "Jugador2" },
//   { name1: "Jugador1", action: "discard", name2: null },
//   { name1: "Ignacho", action: 20, name2: "agustina morales" },
//   { name1: "messi", action: 14, name2: null },
//   { name1: "omg", action: 5, name2: "nt" },
// ];

export function createAction(name1, action, name2) {
  if (name1 === name2) {
    name2 = null;
  }
  return { name1: name1, action: action, name2: name2 };
}

function actionToDiv(action) {
  //las acciones son de la siguiente manera:
  // numeros del 1 al 31: cartas
  // si name2 es null, se ignora
  // exchange es que hay intercambio
  // new_turn es que hay nuevo turno, se ignoran los nombres
  // discard es que alguien descarto, se ignora el nombre 2

  let name1, middleImage, name2;

  if (action.action === "new_turn") {
    //new_turn es el unico caso sin imagen
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        {/* text should be alligned at the center */}
        <Typography
          variant="h4"
          textAlign="center"
          style={{ color: "#455c28" }}
        >
          Turno de {action.name1}
        </Typography>
      </Box>
    );
  } else if (action.action === "exchange") {
    name1 = action.name1;
    middleImage = <CompareArrowsIcon sx={{ fontSize: "80px" }} />;
    name2 = action.name2;
  } else if (action.action === "discard") {
    name1 = action.name1;
    middleImage = <DeleteIcon sx={{ fontSize: "80px" }} />;
    name2 = null;
  } else if (action.action >= 1 && action.action <= 31) {
    //action is a card
    name1 = action.name1;
    name2 = action.name2;

    middleImage = (
      <img
        src={IdToAsset(action.action)}
        alt={`${action.action + 1}`}
        style={{
          width: "70px",
          height: "auto",
          margin: "0 16px",
        }}
      />
    );
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h5">{name1}</Typography>
      {middleImage}
      <Typography variant="h5">{name2}</Typography>
    </Box>
  );
}

export function ActionLog({ listOfActions }) {
  const [open, setOpen] = React.useState(false);
  const [actionList, setActionList] = React.useState([]);

  useEffect(() => {
    setActionList(listOfActions);
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Fab
        color="success"
        aria-label="Add"
        style={{
          position: "fixed",
          left: "16px",
          bottom: "16px",
          zIndex: 100,
        }}
        onClick={toggleDrawer}
      >
        <FormatListBulletedIcon />
      </Fab>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{
          sx: {
            width: "fit-content",
            // height: "fit-page",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            // overflowY: "auto",
          },
        }}
      >
        <h1> Historial de acciones </h1>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={toggleDrawer}
        >
          Cerrar
        </Button>
        <Box
          sx={{
            p: 2,
            borderRadius: "8px",
            height: "fit-page",
            overflowY: "auto",
          }}
        >
          {actionList &&
            actionList.map((action, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  my: 1,
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  marginLeft: "0",
                  wordWrap: "break-word",
                }}
              >
                {actionToDiv(action)}
              </Box>
            ))}
        </Box>
      </Drawer>
    </div>
  );
}

// export default ActionLog;
