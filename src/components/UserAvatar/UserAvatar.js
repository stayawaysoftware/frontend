import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { pink } from "@mui/material/colors";

export default function UserAvatar({ name, css, death }) {
  return (
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
          <Avatar sx={{ width: 50, height: 50, bgcolor: pink[500] }}>
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
          <Avatar src="/broken-image.jpg" sx={{ width: 50, height: 50 }} />
          <Typography variant="h7" component="div" gutterBottom>
            {name}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
