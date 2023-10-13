import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ListItemButton } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ExpandableItem from "./ExpandableItem";
import axios from "axios";
import PeopleIcon from "@mui/icons-material/People";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { API_ENDPOINT_ROOM_LIST } from "../../utils/ApiTypes";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function GetInitials(name) {
  //function to get first two letters from name
  var twoFirstLetters = name.substring(0, 2);
  return twoFirstLetters;
}

export default function GameList() {
  const [gameData, setGameData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { setRoomId } = useContext(UserContext);

  useEffect(() => {
    // should be changed to the API URL constant
    const apiUrl = API_ENDPOINT_ROOM_LIST;

    const getRoomList = async () => {
      axios
        .get(apiUrl)
        .then((response) => {
          setGameData(response.data);
        })
        .catch((error) => {
          console.error("Error al hacer la solicitud GET:", error);
        });
    };
    getRoomList();

    const interval = setInterval(getRoomList, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={10}>
        <Demo
          sx={{ bgcolor: "rgba(255,255,255,0.8)" }}
          style={{ borderRadius: "10px" }}
        >
          <List>
            {gameData.length === 0 ? ( //ternary for checking if there are rooms
              <div>¡Crea una sala y empieza a jugar!</div>
            ) : (
              <div>
                {" "}
                {/*this div is for the ternary to work*/}
                {gameData.map((gameData, index) => (
                  <ExpandableItem
                    key={gameData.id}
                    render={(xprops) => (
                      <>
                        <div>
                          <ListItemButton
                            selected={selectedItem === gameData.id}
                            id={index}
                            onClick={() => {
                              xprops.setOpen(!xprops.open);
                              setSelectedItem(gameData.id);
                              setRoomId(gameData.id);
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar>{GetInitials(gameData.name)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={gameData.name}
                              //secondary={secondary ? "Secondary text" : null}
                            />
                            {xprops.open ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse
                            in={xprops.open}
                            timeout="auto"
                            unmountOnExit
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                              }}
                            >
                              <Typography
                                component="div"
                                style={{
                                  display: "flex",
                                  width: "30%",
                                }}
                                ml={9}
                              >
                                <PeopleIcon
                                  style={{ fontSize: 20, marginRight: "8px" }}
                                />
                                {gameData.users.names.length}/
                                {gameData.users.max}
                              </Typography>
                              <Typography component="div">
                                {/* {ternary for checking if the game in in_game} */}
                                {gameData.in_game ? (
                                  <div>En juego</div>
                                ) : (
                                  <div>Esperando jugadores</div>
                                )}
                              </Typography>
                              {/* <Typography component="div">
                            <LockOpenIcon style={{ fontSize: 18, marginRight: '8px'}}/>                         
                          </Typography> */}
                            </div>
                          </Collapse>
                        </div>
                      </>
                    )}
                  />
                ))}
              </div>
            )}
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
}
