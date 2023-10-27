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
const listOfActions = [
  { name1: "Jugador1", action: 3, name2: "Jugador2" },
  { name1: "Jugador1", action: 8, name2: null },
  { name1: "Player", action: "exchange", name2: "Jugador2" },
  { name1: "Jugador1", action: "new_turn", name2: "Jugador2" },
  { name1: "Jugador1", action: "discard", name2: null },
  { name1: "Ignacho", action: 20, name2: "agustina morales" },
  { name1: "mbappe", action: 14, name2: null },
];

// function generateRandomString() {
//   const length = Math.floor(Math.random() * 9) + 4; // Genera una longitud aleatoria entre 4 y 12 caracteres
//   const characters = "abcdefghijklmnopqrstuvwxyz";
//   let result = "";
//   const charactersLength = characters.length;

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * charactersLength);
//     result += characters.charAt(randomIndex);
//   }

//   return result;
// }

// function newRandomAction() {
//   const randomUser1 = generateRandomString();
//   const randomUser2 = generateRandomString();
//   const randomAction = Math.floor(Math.random() * 31) + 1;
//   return {
//     name1: randomUser1,
//     action: actionToImg(randomAction),
//     name2: randomUser2,
//   };
// }

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
        <Typography variant="h4" textAlign="center">
          {" "}
          ——— Nuevo turno ———
        </Typography>
      </Box>
    );
  } else if (action.action === "exchange") {
    name1 = action.name1;
    middleImage = <CompareArrowsIcon sx={{ fontSize: "100px" }} />;
    name2 = action.name2;
  } else if (action.action === "discard") {
    name1 = action.name1;
    middleImage = <DeleteIcon sx={{ fontSize: "100px" }} />;
    name2 = null;
  } else if (action.action >= 1 && action.action <= 31) {
    //action is a card
    name1 = action.name1;
    // name2 = action.name2 if is not null
    name2 = action.name2;

    middleImage = (
      <img
        src={IdToAsset(action.action)}
        alt={`${action.action + 1}`}
        style={{
          width: "100px",
          height: "auto",
        }}
      />
    );
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h4">{name1}</Typography>
      {middleImage}
      <Typography variant="h4">{name2}</Typography>
    </Box>
  );
}

export function ActionLog() {
  const [open, setOpen] = React.useState(false);
  const [actionList, setActionList] = React.useState([]);

  useEffect(() => {
    setActionList(listOfActions);
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // const addNewAction = (newAction) => {
  //   setActionList([...actionList, newAction]);
  // };

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
      {/* fab for calling addNewAction */}
      <Fab
        color="success"
        style={{
          position: "fixed",
          right: "16px",
          bottom: "50%",
        }}
        // onClick={() => addNewAction(newRandomAction())}
      ></Fab>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{
          sx: {
            width: "fit-content",
            height: "fit-page",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            overflowY: "auto",
          },
        }}
      >
        <h1> Historial de acciones </h1>
        <Button onClick={toggleDrawer}>Cerrar</Button>

        <Box
          sx={{
            p: 2,
            borderRadius: "8px",
          }}
        >
          {actionList.map((action, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                my: 1,
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                marginLeft: "0",
                wordWrap: "break-word",
                // width: "fit-content",
                // flexGrow: 1,
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
