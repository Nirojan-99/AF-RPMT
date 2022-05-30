import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import GroupChatModel from "./GroupChatModel";
import {
  IconButton,
  Paper,
  Skeleton,
  Badge,
  Tooltip,
  Container,
  Typography,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#1071bc",
  boxShadow: 24,
  p: 1,
};
function AllChatModel() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //user data
  const { token, userID, role, URL } = useSelector((state) => state.loging);

  //state
  const [groups, setGroups] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  //useEffect call
  useEffect(() => {
    if (role === "Staff") {
      axios
        .get(`${URL}users/staff/${userID}/groups?group=true`, {
          headers: { Authorization: "Agriuservalidation " + token },
        })
        .then((re) => {
          setLoaded(true);
          setGroups(re.data);
        })
        .catch((er) => {
          setLoaded(true);
        });
    } else {
      axios
        .get(`${URL}users/${userID}`, {
          headers: { Authorization: "Agriuservalidation " + token },
        })
        .then((res) => {
          axios
            .get(`${URL}groups/admin/${res.data.group_id}`, {
              headers: { Authorization: "Agriuservalidation " + token },
            })
            .then((res) => {
              setGroups([res.data]);
              setLoaded(true);
            })
            .catch((er) => {
              setLoaded(true);
            });
        })
        .catch((er) => {
          setLoaded(true);
        });
    }
  }, []);

  return (
    <>
      <Tooltip title={"Chat"}>
        <IconButton onClick={handleOpen} size="large" color="inherit">
          <Badge badgeContent={0} color="error">
            <MessageIcon fontSize="inherit" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Container maxWidth="sm">
          <Box
            component={Paper}
            elevation={1}
            sx={{
              ...style,
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
            }}
            minWidth={{ xs: 300, sm: 400 }}
          >
            {isLoaded ? (
              groups ? (
                groups.map((row, index) => {
                  return <GroupChatModel key={index} data={row} />;
                })
              ) : (
                <Typography sx={{ fontSize: 12, textAlign: "center", mt: 3 }}>
                  No Assigned Groups Found
                </Typography>
              )
            ) : (
              <>
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  sx={{ borderRadius: 1, mb: 1 }}
                  width={"100%"}
                  height={70}
                />
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  sx={{ borderRadius: 1, mb: 1 }}
                  width={"100%"}
                  height={70}
                />
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  sx={{ borderRadius: 1, mb: 1 }}
                  width={"100%"}
                  height={70}
                />
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  sx={{ borderRadius: 1, mb: 1 }}
                  width={"100%"}
                  height={70}
                />
              </>
            )}
          </Box>
        </Container>
      </Modal>
    </>
  );
}

export default AllChatModel;
