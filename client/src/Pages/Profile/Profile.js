import {
  Paper,
  Container,
  Box,
  Grid,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Drawer from "@mui/material/Drawer";
import Header from "../../Components/Header";
import Options from "./Options";
import EditDetails from "./Components/EditDetails";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Editpassword from "./Components/EditPassword";
import Research from "./Components/Research";
import SearchGroup from "./Components/SearchGroup";
import OwnGroup from "./Components/OwnGroup";
import RequestSupervisor from "./Components/RequestSupervisor";
import Submission from "./Components/Submissions";

//react
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const useStyle = makeStyles({
  buttons: {
    position: "fixed",
    right: "0px",
    top: "45%",
    bgcolor: "#073050",
    zIndex: "100",
  },
});

function Profile(props) {
  //hooks
  const { page } = useParams();
  const navigate = useNavigate();

  //state
  const [state, setState] = useState(false);
  const { token, userID, role } = useSelector((state) => state.loging);

  const Floating = () => {
    const classes = useStyle();
    return (
      <div className={classes.buttons}>
        <Grid item display={{ sm: "none", xs: "block", posision: "absolute" }}>
          <Box
            p={0.5}
            sx={{ bgcolor: "#DFDADA", borderRadius: "5px 0 0 5px" }}
            elevation={4}
          >
            <IconButton onClick={toggleDrawer(true)}>
              <MenuOpenIcon fontSize="small" color="secondary" />
            </IconButton>
          </Box>
        </Grid>
      </div>
    );
  };

  const uriChecker = (text) => {
    const uri = text === "Profile" ? "details" : text.toLowerCase();
    return uri;
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Profile", "Research", "Submissions"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              navigate(`/profile/${uriChecker(text)}`);
            }}
          >
            <ListItemIcon>
              <RadioButtonCheckedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Paper square elevation={1}>
        <Floating />
        <Container maxWidth="lg">
          <Box py={3}>
            <Box>
              <Grid
                container
                spacing={{ xs: 1, sm: 2 }}
                alignContent="center"
                justifyContent={"center"}
              >
                <Grid item xs={4} display={{ sm: "block", xs: "none" }}>
                  <Options />
                </Grid>
                <Grid item xs={12} sm={8}>
                  {page === "details" && <EditDetails />}
                  {page === "change-password" && <Editpassword />}
                  {page === "research" && <Research />}
                  {page === "own-group" && <SearchGroup />}
                  {page === "group" && <OwnGroup />}
                  {page === "submissions" && <Submission />}
                  {(page.split("-")[0] === "supervisor" ||
                    page.split("-")[0] === "coSupervisor") && (
                    <RequestSupervisor page={page} />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Paper>
    </>
  );
}

export default Profile;
