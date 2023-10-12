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

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };


  useEffect(() => {
    const handleMessage = (event) => {
      const json = JSON.parse(event.data);
      if (json.type === "message") {
        setMessages((messages) => [...messages, json]);
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
        padding: "16px",
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              my: 1,
              borderRadius: "8px",
              backgroundColor:
                message.sender === username ? "rgba(0, 100, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
              marginLeft: username === message.sender ? "auto" : "0",
              wordWrap: "break-word",
              width: "fit-content",

            }}
          >
            {message.sender === username ? message.content : `${message.sender}: ${message.content}`}
          </Box>
        ))}
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              size="small"
              placeholder="Escribe un mensaje"
              variant="outlined"
              color="success"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="large"
              color="success"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
