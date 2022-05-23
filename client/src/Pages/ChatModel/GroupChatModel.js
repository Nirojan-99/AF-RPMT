import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Avatar, Skeleton, Typography } from "@mui/material";
import MessageBox from "./MessageBox";

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

function GroupChatModel(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <Box
          sx={{
            cursor: "pointer",
            backgroundColor: "#05243C",
            boxShadow: "0px 1px 2px 0px #333",
            borderRadius: 1,
            width: "100%",
          }}
          m={0}
          py={1}
          style={{ direction: "ltr" }}
        >
          <Box
            p={1}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: 50, height: 50 }}
              alt="User image"
              src="/static/images/avatar/1.jpg"
            >
              {props.data.name.charAt(0)}
            </Avatar>
            <Box sx={{ textAlign: "left", ml: 2 }}>
              <Typography
                noWrap
                fontFamily={"open sans"}
                fontWeight={"700"}
                color={"#DFDADA"}
              >
                {props.data.name}
              </Typography>

              <Typography
                fontFamily={"Amaranth"}
                fontWeight={"500"}
                color={"#8D8C8C"}
              >
                Date
              </Typography>

              <>
                <Skeleton
                  animation="pulse"
                  variant="text"
                  sx={{ borderRadius: 1, mb: 2 }}
                  width={"100%"}
                />
              </>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
        </Box>
      </Button>

      <MessageBox handleClose={handleClose} id={props.data._id} open={open} />
    </>
  );
}

export default GroupChatModel;
