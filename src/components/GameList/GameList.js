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

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    initials: `P${k}`,
    primary: `Partida ${k}`,
    actual_players: `Jugadores: ${k}`,
    capacity: `Capacidad: ${k}`,
  }));

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function GameList() {
  const [items, setItem] = React.useState(getItems(14));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={10}>
        <Demo>
          <List>
            {items.map((item, index) => (
              <ExpandableItem
                render={(xprops) => (
                  <>
                    <div>
                      <ListItemButton
                        onClick={() => xprops.setOpen(!xprops.open)}
                      >
                        <ListItemAvatar>
                          <Avatar>{item.initials}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.primary}
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
                            {item.actual_players}
                          </Typography>
                          <Typography component="div">
                            {item.capacity}
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