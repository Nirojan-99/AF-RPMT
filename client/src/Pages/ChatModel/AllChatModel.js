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
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";

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
            <>No groups</>

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
          </Box>
        </Container>
      </Modal>
    </>
  );
}

export default AllChatModel;
