import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, IconButton, TextField, Paper, Skeleton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LeftMessage from "./LeftMessage";
import RightMessage from "./RightMessage";
import SendIcon from "@mui/icons-material/Send";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const MessageBox = (props) => {
  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //state
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [isLoaded, setLoaded] = useState(false);
  const [isSent, setSent] = useState(false);

  //use efffec
  useEffect(() => {
    axios
      .get(`${URL}chats/${props.id}/${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((re) => {
        setLoaded(true);
        setMessages(re.data);
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, [isSent]);

  //polling to get new msges every 1 minute intervel
  setTimeout(() => {
    axios
      .get(`${URL}chats/${props.id}/${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((re) => {
        setMessages(re.data);
      })
      .catch((er) => {});
  }, 60000);

  //send message
  const sendMsg = () => {
    if (!msg.trim()) {
      return;
    }
    setSent(false);
    axios
      .put(
        `${URL}chats/${props.id}/${userID}`,
        { message: msg },
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        setSent(true);
        setMsg("");
      })
      .catch((er) => {
        setMsg("");
      });
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={{ ...style, width: 700 }}>
        <Box
          p={1.5}
          component={Paper}
          elevation={1}
          square
          sx={{
            boxShadow: "0px 1px 1px 0px #222",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={props.handleClose}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar>{messages[0] && messages[0].group_id.name.charAt(0)}</Avatar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="small"
            sx={{ bgcolor: "#777", color: "#333" }}
            onClick={props.handleClose}
          >
            <CloseIcon sx={{ color: "#333" }} fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: 400,
            backgroundColor: "#073050",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isLoaded ? (
            messages ? (
              messages.map((row, index) => {
                if (row.sender._id == userID) {
                  return <RightMessage key={index} data={row} />;
                } else {
                  return <LeftMessage key={index} data={row} />;
                }
              })
            ) : (
              <></>
            )
          ) : (
            <Box>
              <LeftSkelton />
              <RightSkelton />
              <LeftSkelton />
              <RightSkelton />
            </Box>
          )}
        </Box>
        <Box sx={{ height: "12%", backgroundColor: "grey" }}>
          <Box
            p={1.5}
            component={Paper}
            elevation={1}
            square
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ flexGrow: 1 }} ml={1} />
            <TextField
              value={msg}
              onChange={(event) => {
                setMsg(event.target.value);
              }}
              fullWidth
              variant="outlined"
              color="info"
              size="small"
              margin="none"
              sx={{ backgroundColor: "#0A4C81", borderRadius: 0 }}
            ></TextField>
            <IconButton
              type="submit"
              onClick={sendMsg}
              size="medium"
              sx={{ borderRadius: 1, bgcolor: "#0A4C81" }}
            >
              <SendIcon size="large" color="info" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const LeftSkelton = () => {
  return (
    <Skeleton
      animation="pulse"
      variant="rectangular"
      sx={{ borderRadius: "0px 15px  15px 15px", m: 1.5 }}
      width="80%"
      height={60}
    />
  );
};
const RightSkelton = () => {
  return (
    <Box width={"100%"} sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ flexGrow: 1 }} />
      <Skeleton
        animation="pulse"
        variant="rectangular"
        sx={{ borderRadius: "15px 0px 15px 15px", m: 1.5 }}
        width="80%"
        height={60}
      />
    </Box>
  );
};

export default MessageBox;
