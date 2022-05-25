//react
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
//react

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { red } from "@mui/material/colors";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

function Pannel(props) {
  return (
    <>
      <ToastContainer />
      <Header handler={props.handler} />
      <Box minHeight={"80vh"} component={Paper} square elevation={1} py={2}>
        <Container maxWidth="sm">
          <Box component={Paper} variant="outlined" p={2}>
            <Typography sx={{ color: "#1071bc", textAlign: "center" }}>
              Your Pannel Groups
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid
              container
              direction={"row"}
              justifyContent="center"
              alignItems={"stretch"}
              spacing={2}
              minHeight="25vh"
            ></Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
const GroupSkelton = () => {
  return (
    <Grid item xs={12} sm={6} sx={{ p: 1 }}>
      <Skeleton
        animation="pulse"
        variant="rectangular"
        sx={{ borderRadius: 1, mb: 2 }}
        width={"100%"}
        height={200}
      />
    </Grid>
  );
};

const Group = (props) => {
  return (
    <Grid item xs={12} sm={6} sx={{ p: 1 }}>
      <Box
        component={Paper}
        elevation={3}
        p={{ xs: 2, sm: 1 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ height: 60, width: 60 }}>
          {props.data.name.charAt(0)}
        </Avatar>
        <Typography sx={{ color: "#1071bc", fontSize: 16 }}>
          {props.data.name}
        </Typography>
        <Button
          href={`/groups/${props.data._id}`}
          size="small"
          endIcon={<DoubleArrowIcon size={"small"} sx={{ height: 14 }} />}
          sx={{ color: "#999", fontSize: 12, textTransform: "none" }}
        >
          see more details
        </Button>
        <Divider sx={{ width: "100%", my: 1.5 }} />
        <Box sx={{ textAlign: "left", width: "100%" }}>
          <Typography
            sx={{ my: 1, color: "#aaa", fontWeight: "600", fontSize: 15 }}
          >
            {props.data.research_Field}
          </Typography>
          <Typography
            sx={{ mb: 1, color: "#aaa", fontWeight: "600", fontSize: 15 }}
          >
            {props.data.research_Topic.name}
          </Typography>
          <Button
            href={props.data.research_Topic_doc}
            fullWidth
            disableElevation
            variant="contained"
            startIcon={<FileDownloadIcon />}
            sx={{
              my: 1,
              textTransform: "none",
              bgcolor: "#1071bc",
              color: "#333",
              "&:hover": { color: "#fff", bgcolor: "#116BB1" },
            }}
          >
            Download Topic doc
          </Button>
        </Box>
        <Divider sx={{ width: "100%", my: 1.5 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              disabled={!props.data.research_Topic_doc}
              onClick={() => {
                props.handler("accept", props.data._id);
              }}
              sx={{
                my: 1,
                textTransform: "none",
                color: "#ddd",
                "&:hover": { color: "#fff", bgcolor: "#116BB1" },
              }}
            >
              Accept
            </Button>
            <Button
              disabled={!props.data.research_Topic_doc}
              onClick={() => {
                props.handler("reject", props.data._id);
              }}
              sx={{
                ml: 1,
                my: 1,
                textTransform: "none",
                color: "red",
                "&:hover": { color: "#fff", bgcolor: "red" },
              }}
            >
              Reject
            </Button>
          </>
          <>
            <Button disabled startIcon={<BeenhereIcon />}>
              Topic {`${props.data.research_Topic.status}ed`}
            </Button>
          </>
        </Box>
        {!props.data.research_Topic_doc && (
          <Typography sx={{ color: red[300], fontSize: 12 }}>
            Topic doc yet to submit
          </Typography>
        )}
      </Box>
    </Grid>
  );
};

export default Pannel;
