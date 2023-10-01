import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

export default function UserAvatar({ name, css }) {
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
      <Avatar src="/broken-image.jpg" sx={{ width: 50, height: 50 }} />
      <Typography variant="h7" component="div" gutterBottom>
        {name}
      </Typography>
    </Stack>
  );
}
