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
import PeopleIcon from '@mui/icons-material/People';
import LockOpenIcon from '@mui/icons-material/LockOpen';

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
    const apiUrl = "http://localhost:8000/rooms";

    axios
      .get(apiUrl)
      .then((response) => {
        setGameData(response.data);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud GET:", error);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={10}>
        <Demo>
          <List>
            {gameData.map((gameData, index) => (
              <ExpandableItem
                key={gameData.id}
                render={(xprops) => (
                  <>
                    <div>
                      <ListItemButton
                        selected={selectedItem === gameData.id}
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
                      <Collapse in={xprops.open} timeout="auto" unmountOnExit>
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
                            <PeopleIcon style={{ fontSize: 20, marginRight: '8px'}}/>
                            {gameData.usernames.length}/12
                          </Typography>
                          <Typography component="div">
                            {/* {ternary for checking if the game in in_game} */}
                            {gameData.in_game ? (
                             <div>In game</div>
                            ) : (
                              <div>Waiting for players</div>
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
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
}
