import React, { useState, useEffect, useContext } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../contexts/UserContext";

export const Chat = ({ socket }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const { username } = useContext(UserContext);

  const handleSend = () => {
    if (input.trim() !== "") {
      // Send the message to the WebSocket server as a JSON string
      // with user and input
      const messageData = JSON.stringify({
        type: "message",
        sender: username,
        content: input,
      });
      socket.send(messageData);

      console.log("Mensaje enviado: ", messageData);
      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Handle messages received from the WebSocket server
  useEffect(() => {
    const handleMessage = (event) => {
      const json = JSON.parse(event.data);
      if (json.type === "message") {
        const builtMessage = `${json.sender}: ${json.content}`;
        setMessages((messages) => [...messages, builtMessage]);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="large"
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Chat;
