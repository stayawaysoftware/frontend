import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { green, pink } from "@mui/material/colors";
import "./UserAvatar.css";
import crown from "../../assets/crown.png";
import sword from "../../assets/sword.png";
import cuarentena from "../../assets/cuarentena.png";
import LockIcon from "@mui/icons-material/Lock";
import left_door from "../../assets/left_door.png";
import right_door from "../../assets/right_door.png";
import double_door from "../../assets/double_door.png";

export const UserAvatar = ({
  name,
  css,
  death,
  turn,
  onClick,
  turnDefense,
  quarentine,
  door_locked,
}) => (
  <Stack
    direction="column"
    spacing={1}
    className="square"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      className: "square",
      transform:
        "rotate(" +
        css.rotate +
        "deg) translate(" +
        css.radius +
        "px) rotate(" +
        css.rotateReverse +
        "deg)",
    }}
  >
    {death ? (
      <Stack
        direction="column"
        spacing={1}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ width: 50, height: 50, bgcolor: pink[500] }} id="death">
          <CloseIcon />
        </Avatar>
        <Typography variant="h7" component="div" gutterBottom>
          {name}
        </Typography>
      </Stack>
    ) : (
      <Stack
        direction="column"
        spacing={1}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {turn && (
          <div style={quarentine ? { marginBottom: -15 } : {}}>
            <img src={crown} alt="crown" className="img" />
          </div>
        )}

        {turnDefense && (
          <div style={quarentine ? { marginBottom: -15 } : {}}>
            <img src={sword} alt="sword" className="img" />
          </div>
        )}

        {door_locked ? (
          <>
            {quarentine ? (
              <div className="row">
                <img
                  src={cuarentena}
                  alt="quarentine"
                  className="cuarentena"
                  style={{ marginLeft: 42 }}
                />
                <div className="column2">
                  <img
                    src={
                      door_locked === -1
                        ? left_door
                        : door_locked === 1
                        ? right_door
                        : door_locked === 2
                        ? double_door
                        : null
                    }
                    alt={
                      door_locked === -1
                        ? "left_door"
                        : door_locked === 1
                        ? "right_door"
                        : door_locked === 2
                        ? "double_door"
                        : null
                    }
                    className="image"
                  />
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="column">
                  <Avatar
                    src="/broken-image.jpg"
                    sx={[
                      {
                        width: 50,
                        height: 50,
                        bgcolor: green[400],
                      },
                      onClick && {
                        cursor: "pointer",
                        outline: "none",
                        borderColor: "#9ecaed",
                        boxShadow: "0 0 10px #9ecaed",
                      },
                    ]}
                    onClick={onClick}
                    style={{ marginLeft: 50 }}
                  />
                </div>
                <div className="column">
                  <img
                    src={
                      door_locked === -1
                        ? left_door
                        : door_locked === 1
                        ? right_door
                        : door_locked === 2
                        ? double_door
                        : null
                    }
                    alt={
                      door_locked === -1
                        ? "left_door"
                        : door_locked === 1
                        ? "right_door"
                        : door_locked === 2
                        ? "double_door"
                        : null
                    }
                    className="image"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {quarentine ? (
              <img src={cuarentena} alt="quarentine" className="cuarentena" />
            ) : (
              <Avatar
                src="/broken-image.jpg"
                sx={[
                  {
                    width: 50,
                    height: 50,
                    bgcolor: green[400],
                  },
                  onClick && {
                    cursor: "pointer",
                    outline: "none",
                    borderColor: "#9ecaed",
                    boxShadow: "0 0 10px #9ecaed",
                  },
                ]}
                onClick={onClick}
              />
            )}
          </>
        )}

        <Typography
          variant="h7"
          component="div"
          gutterBottom
          style={quarentine && door_locked ? { marginTop: -5 } : {}}
        >
          {name}
        </Typography>
      </Stack>
    )}
  </Stack>
);
