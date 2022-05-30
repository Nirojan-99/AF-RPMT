import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Heading from "../../../Components/Heading";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Supervisor from "../Util/Supervisor";

//react
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useStyle = makeStyles({
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

function RequestSupervisor(props) {
  //data
  const page = props.page.split("-")[0];
  const grp_id = props.page.split("-")[1];

  //hooks
  const classes = useStyle();

  //state
  const [hasSupervisor, setSupervisor] = useState();
  const [hasRequestedSupervisor, setReqSupervisor] = useState();
  const [isLoaded, setLoaded] = useState(false);

  //search loading
  const [isSearchLoaded, setSearchLoaded] = useState(true);

  //search val
  const [search, setSearch] = useState("");
  const [searchval, setSearchval] = useState([]);

  //user data
  const { token, userID, role, URL } = useSelector((State) => State.loging);

  //useEffect call
  useEffect(() => {
    axios
      .get(`${URL}groups/${grp_id}?${page}={true}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoaded(true);
        if (res.data.supervisor) {
          setSupervisor(true);
        } else if (res.data.Requested) {
          setReqSupervisor(true);
        } else if (res.data.isRequestable) {
        }
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  //search
  const submit = () => {
    if (!search.trim()) {
      setSearchval([]);
      return;
    }
    setSearchLoaded(false);
    axios
      .get(`${URL}users/staff/${page}?search=${search}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setSearchLoaded(true);
        setSearchval(res.data.data);
      })
      .catch((er) => {
        setSearchLoaded(true);
      });
  };

  return (
    <>
      <Paper elevation={4}>
        <Box
          p={2}
          sx={{ bgcolor: "#073050", borderRadius: "3px", textAlign: "center" }}
          minHeight={"73vh"}
        >
          {isLoaded ? (
            <>
              <Heading heading={`Request ${page}`} />
              <Container maxWidth="sm">
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems=""
                  spacing={1}
                >
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <TextField
                        disabled={hasSupervisor || hasRequestedSupervisor}
                        color="info"
                        variant="outlined"
                        margin="none"
                        value={search}
                        onChange={(event) => {
                          setSearch(event.target.value);
                        }}
                        helperText=" You can only request to one staff"
                        size="small"
                        onKeyDown={submit}
                        inputProps={{ className: classes.inputs }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item sx={{ textAlign: "right" }}>
                    <Button
                      onClick={submit}
                      disabled={hasSupervisor || hasRequestedSupervisor}
                      sx={{ bgcolor: "#1383DD", color: "#fff", margin: "0" }}
                      color="secondary"
                      className={classes.btn}
                      endIcon={<SearchIcon Size="small" />}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: "open sans",
                          fontWeight: "600",
                          textTransform: "none",
                        }}
                      >
                        Search
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>

                <Box my={5} />
                <Container maxWidth="xs">
                  {isSearchLoaded ? (
                    <>
                      {searchval.length > 0 &&
                        searchval.map((row, index) => {
                          return (
                            <Supervisor
                              page={page}
                              grp={grp_id}
                              key={index}
                              data={row}
                            />
                          );
                        })}
                    </>
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
                      <Skeleton
                        animation="pulse"
                        variant="rectangular"
                        sx={{ borderRadius: 1, mb: 2 }}
                        width={"100%"}
                        height={50}
                      />
                    </>
                  )}
                </Container>
              </Container>
            </>
          ) : (
            <>
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
      </Paper>
    </>
  );
}

export default RequestSupervisor;
