import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  Grid,
  TextField,
  IconButton,
  Pagination,
  Avatar,
  Skeleton,
} from "@mui/material";
import Header from "../../Components/Header";
import SearchIcon from "@mui/icons-material/Search";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GroupView(props) {
  //state
  const [pannelView, setPannelView] = useState(false);
  const [group, setGroup] = useState();
  const [isLoaded, setLoaded] = useState(false);

  //grp id
  const { id } = useParams();

  //user data
  const { userID, token, role,URL } = useSelector((state) => state.loging);

  //use Effect call
  useEffect(() => {
    axios
      .get(`${URL}groups/admin/${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoaded(true);
        if (res.data) {
          setGroup(res.data);
        } else {
          //handle
        }
      })
      .catch((er) => {
        setLoaded(true);
        //handle
      });
  }, []);

  //pannel
  //search val
  const [search, setSearch] = useState("");
  const [staff, setStaff] = useState([]);
  const [isLoadedSearch, setLoadedSearch] = useState(false);

  //search  pannel
  const searchHandler = () => {
    setLoadedSearch(false);
    axios
      .get(`${URL}users/staff/staff?search=${search}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoadedSearch(true);
        setStaff(res.data.data);
      })
      .catch((er) => {
        setLoadedSearch(true);
      });
  };

  //remove pannel
  const removePannel = (staffid) => {
    axios
      .delete(`${URL}groups/pannel/${id}/${staffid}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        toast(`${props.data.name} added to pannel`, { type: "success" });
      })
      .catch((er) => {
        toast(`unable to add to pannel, try again`, { type: "error" });
      });
  };

  return (
    <>
      <Header handler={props.handler} />
      <Box
        sx={{}}
        minHeight="79vh"
        component={Paper}
        square
        elevation={0}
        p={2}
      >
        <Grid
          container
          direction={"row"}
          justifyContent="center"
          alignItems={"stretch"}
          spacing={2}
          minHeight="50vh"
        >
          <Grid item xs={12} sm={6} md={4}>
            {isLoaded ? (
              group !== undefined ? (
                <Box
                  component={Paper}
                  variant="outlined"
                  p={2}
                  sx={{
                    display: "Flex",
                    flexDirection: "column",
                    alignItem: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#1071bc", fontSize: 17, mb: 2 }}>
                    {group.name}
                  </Typography>
                  <Divider />
                  <Box
                    sx={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    py={2}
                  >
                    <Typography sx={{ color: "#888", fontSize: 16 }}>
                      {group.research_Topic.name}
                    </Typography>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Supervisor :
                      <span style={{ color: "#E28743" }}>
                        {group.supervisor ? group.supervisor.name : "N/A"}
                      </span>
                    </Typography>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Co-Supervisor :
                      <span style={{ color: "#E28743" }}>
                        {group.coSupervisor ? group.coSupervisor.name : "N/A"}
                      </span>
                    </Typography>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Student Count :
                      <span style={{ color: "#E28743" }}>
                        {group.members.length}
                      </span>
                    </Typography>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Group Leader :
                      <span style={{ color: "#E28743" }}>
                        {group.leader.name}
                      </span>
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                          Members :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        {group.members.length > 0 &&
                          group.members.map((row, index) => {
                            return (
                              <Typography
                                key={index}
                                sx={{ color: "#E28743", fontSize: 15 }}
                              >
                                {row.name}
                              </Typography>
                            );
                          })}
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }} />
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                          Pannel :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <>
                          {group.pannel.length > 0 ? (
                            group.pannel.map((row, index) => {
                              return (
                                <>
                                  <Box
                                    my={1}
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      sx={{ color: "#E28743", fontSize: 15 }}
                                    >
                                      {row.name}
                                    </Typography>
                                    {role === "Admin" && (
                                      <Button
                                        onClick={() => {
                                          removePannel(row._id);
                                        }}
                                        color="error"
                                        sx={{
                                          color: "red",
                                          textTransform: "none",
                                          fontWeight: "600",
                                          fontSize: 14,
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    )}
                                  </Box>
                                  {role === "Admin" && <Divider />}
                                </>
                              );
                            })
                          ) : (
                            <Typography
                              sx={{
                                color: "red",
                                fontWeight: "500",
                                fontSize: 13,
                              }}
                            >
                              No Pannel assigned
                            </Typography>
                          )}
                        </>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }} />
                    {role === "Admin" && (
                      <Button
                        color="success"
                        variant="contained"
                        href="#pannel"
                        onClick={() => {
                          setPannelView((pre) => !pre);
                        }}
                      >
                        Add Pannel
                      </Button>
                    )}
                  </Box>
                </Box>
              ) : (
                <>
                  <Typography>No data available</Typography>
                </>
              )
            ) : (
              <>
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  sx={{ borderRadius: 1, mb: 2 }}
                  width={"100%"}
                  height={"100%"}
                />
              </>
            )}
          </Grid>
          {pannelView && (
            <Grid id="pannel" item xs={12} sm={6} md={4}>
              <Box
                component={Paper}
                variant="outlined"
                p={2}
                sx={{
                  display: "Flex",
                  flexDirection: "column",
                  alignItem: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: 17, color: "#1071bc" }}>
                  Select Pannel
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex" }}>
                  <TextField
                    size="small"
                    fullWidth
                    margin="none"
                    color="success"
                    required
                    autoFocus
                    label="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    sx={{ fontWeight: "500" }}
                  />
                  <IconButton
                    onClick={searchHandler}
                    sx={{
                      borderRadius: 0.5,
                      bgcolor: "#E28743",
                      color: "#fff",
                      "&:hover": { bgcolor: "#1071bc" },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
                <Box mt={2}>
                  {isLoadedSearch ? (
                    staff.length > 0 ? (
                      staff.map((row, index) => {
                        return <Staff key={index} data={row} />;
                      })
                    ) : (
                      <Typography>No mating data found</Typography>
                    )
                  ) : (
                    <>
                      {[1, 2, 3, 4, 5].map((row) => {
                        return (
                          <Skeleton
                            key={row}
                            animation="pulse"
                            variant="rectangular"
                            sx={{ borderRadius: 1, mb: 2 }}
                            width={"100%"}
                            height={40}
                          />
                        );
                      })}
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

const Staff = (props) => {
  //grp id
  const { id } = useParams();

  //user data
  const { userID, token } = useSelector((state) => state.loging);

  //url
  const URL = "http://localhost:5000/api/v1/";

  //add pannel
  const addPannel = () => {
    axios
      .put(
        `${URL}groups/pannel/${id}/${props.data._id}`,
        {},
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        toast(`${props.data.name} added to pannel`, { type: "success" });
      })
      .catch((er) => {
        toast(`unable to add to pannel, try again`, { type: "error" });
      });
  };
  return (
    <Box
      component={Paper}
      variant="outlined"
      mb={2}
      p={2}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ToastContainer />
      <Avatar src={props.data.dp}>{props.data.name.charAt(0)}</Avatar>
      <Typography
        sx={{ color: "#1071bc", fontWeight: "600", fontSize: 16, ml: 2 }}
      >
        {props.data.name}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Button color="success" onClick={addPannel}>
        Add
      </Button>
    </Box>
  );
};
export default GroupView;
