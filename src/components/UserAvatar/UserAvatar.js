import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { green, pink } from "@mui/material/colors";
import "./UserAvatar.css";
import crown from "../../assets/crown.png";

export const UserAvatar = ({ name, css, death, turn, onClick }) => (
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
          <div className="turn">
            <img src={crown} alt="crown" className="img" />
          </div>
        )}

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
        <Typography variant="h7" component="div" gutterBottom>
          {name}
        </Typography>
      </Stack>
    )}
  </Stack>
);
