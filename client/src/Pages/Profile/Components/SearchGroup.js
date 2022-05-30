import {
  Paper,
  Box,
  Grid,
  Checkbox,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControl,
  Skeleton,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import Heading from "../../../Components/Heading";
import SearchIcon from "@mui/icons-material/Search";
import UserData from "../Util/UserData";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyle = makeStyles({
  labels: {
    color: "#fff",
    fontFamily: "open sans",
    fontWeight: "700",
    fontSize: 15,
    cursor: "pointer",
  },
  inputs: {
    color: "#99ccff",
    background: "rgb(6, 74, 130)",
    borderRadius: "5px",
    fontFamily: "arial",
    fontWeight: "600",
    letterSpacing: ".5px",
  },
  btn: {
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
    },
  },
});

function SearchGroup() {
  //hook
  const classes = useStyle();

  //user data
  const { token, userID, role, URL } = useSelector((state) => state.loging);

  //state
  const [groups, setGroups] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [isLoaded, setLoaded] = useState(true);

  //search
  const search = () => {
    setLoaded(false);
    searchVal.trim();
    axios
      .get(`${URL}groups/searches/${searchVal}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoaded(true);
        setGroups(res.data);
      })
      .catch((er) => {
        setLoaded(true);
      });
  };

  return (
    <>
      <ToastContainer />
      <Paper elevation={4}>
        <Box
          p={2}
          sx={{ bgcolor: "#073050", borderRadius: "3px", textAlign: "center" }}
          minHeight={"77vh"}
        >
          <Heading heading="Requesting fro Group" />
          <Box my={0.5}>
            <Box mt={2} width="100%">
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems={"center"}
                spacing={0.6}
              >
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      color="info"
                      variant="outlined"
                      margin="none"
                      size="small"
                      value={searchVal}
                      onChange={(ev) => {
                        setSearchVal(ev.target.value);
                      }}
                      className={classes.inputs}
                      inputProps={{ className: classes.inputs }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Box borderRadius={2} bgcolor="#1074C6">
                    <IconButton onClick={search}>
                      <SearchIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
              <Box mt={4} />
              {isLoaded ? (
                groups.length > 0 ? (
                  groups.map((row, index) => {
                    return <UserData key={index} data={row} />;
                  })
                ) : (
                  <></>
                )
              ) : (
                <>
                  <Skeleton
                    animation="pulse"
                    variant="rectangular"
                    sx={{ borderRadius: 1, mb: 2 }}
                    width={"100%"}
                    height={50}
                  />
                  <Skeleton
                    animation="pulse"
                    variant="rectangular"
                    sx={{ borderRadius: 1, mb: 2 }}
                    width={"100%"}
                    height={50}
                  />
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default SearchGroup;
