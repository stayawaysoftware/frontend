import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { styled } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  ListItemButton,
  Collapse,
  Typography,
  Grid,
  Avatar,
  ListItemText,
  ListItemAvatar,
  List,
} from "@mui/material";
import ExpandableItem from "./ExpandableItem";
import PasswordDialog from "../LobbyConfig/PasswordDialog";
import { API_ENDPOINT_ROOM_LIST } from "../../utils/ApiTypes";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function GetInitials(name) {
  //function to get first two letters from name
  var twoFirstLetters = name.substring(0, 2);
  return twoFirstLetters;
}

export default function GameList({ setError }) {
  const [gameData, setGameData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const { userid, setRoomId } = useContext(UserContext);

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
          setError(error.response.data.detail);
        });
    };
    getRoomList();

    const interval = setInterval(getRoomList, 2000);

    return () => clearInterval(interval);
  }, []);

  const displayItem = (roominfo) => {
    // request to get the room info here
    setSelectedItem(roominfo.id);
    if (!roominfo.in_game && roominfo.users.names.length < roominfo.users.max) {
      if (roominfo.is_private) {
        setOpenPasswordDialog(true);
      } else {
        setRoomId(roominfo.id);
      }
    } else {
      setSelectedItem(null);
      setRoomId(null);
    }
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  };

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
                              if (!xprops.open) {
                                displayItem(gameData);
                              }
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar>{GetInitials(gameData.name)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={gameData.name} />
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
                                ml={2}
                              >
                                <PeopleIcon
                                  style={{ fontSize: 20, marginRight: "8px" }}
                                />
                                {gameData.users.names.length}/
                                {gameData.users.max}
                              </Typography>
                              {/* typography for is_priavte */}
                              <Typography
                                component="div"
                                style={{
                                  display: "flex",
                                  width: "30%",
                                }}
                              ></Typography>
                              {/* {typography should be at position right} */}
                              <Typography
                                component="div"
                                style={{
                                  display: "flex",
                                  width:
                                    gameData.users.names.length <
                                      gameData.users.max && !gameData.in_game
                                      ? "55%"
                                      : "25%",
                                  marginLeft: "auto",
                                  marginRight: "2px",
                                }}
                              >
                                {!gameData.is_private &&
                                !gameData.in_game &&
                                !(
                                  gameData.users.names.length >=
                                  gameData.users.max
                                ) ? (
                                  <LockOpenIcon
                                    style={{ fontSize: 20, marginRight: "8px" }}
                                  />
                                ) : (
                                  <LockIcon
                                    style={{ fontSize: 20, marginRight: "8px" }}
                                  />
                                )}
                                {/* {ternary for checking if the game in in_game} */}
                                {gameData.in_game ? (
                                  <div>En juego</div>
                                ) : (
                                  <div>
                                    {gameData.users.names.length <
                                    gameData.users.max ? (
                                      <div>Esperando jugadores</div>
                                    ) : (
                                      <div>Sala llena</div>
                                    )}
                                  </div>
                                )}
                              </Typography>
                            </div>
                          </Collapse>
                        </div>
                      </>
                    )}
                  />
                ))}
                <PasswordDialog
                  open={openPasswordDialog}
                  onClose={handleClosePasswordDialog}
                  room_name={
                    selectedItem != null &&
                    gameData !== undefined &&
                    gameData !== null &&
                    gameData.find((room) => room.id === selectedItem).name
                  }
                  userid={userid}
                  roomid={selectedItem}
                />
              </div>
            )}
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
}
