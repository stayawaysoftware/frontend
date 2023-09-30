import * as React from "react";
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

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function GetInitials(name) {
  //function to get first two letters from name
  var twoFirstLetters = name.substring(0, 2);
  return twoFirstLetters;
}

export default function GameList() {
  const [items, setItem] = React.useState(getItems(14));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={10}>
        <Demo>
          <List>
            {gameData.map((gameData, index) => (
              <ExpandableItem
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
                            Min users {gameData.min_users}
                          </Typography>
                          <Typography component="div">
                            Max users {gameData.max_users}
                            {/*THE ROOM DATA SHOULD BE n/N where n is current 
                            players and N is max players*/}
                          </Typography>
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
