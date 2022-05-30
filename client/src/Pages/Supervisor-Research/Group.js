import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";

//react
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Group(props) {
  //user data
  const { token, userID,URL } = useSelector((state) => state.loging);

  //groupid
  const { id } = useParams();

  //state
  const [group, setGroup] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  //useEffect call
  useEffect(() => {
    axios
      .get(`${URL}groups/admin/${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoaded(true);
        console.log(res.data);
        if (res.data) {
          setGroup(res.data);
        }
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  //lect grp
  const leftGroup = () => {
    axios
      .delete(`${URL}groups/${userID}/requests/${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        toast("Successfully left group", { type: "success" });
      })
      .catch((er) => {
        toast("unable to left group", { type: "error" });
      });
  };

  return (
    <>
      <ToastContainer />
      <Header handler={props.handler} />
      <Box
        sx={{}}
        minHeight="79vh"
        component={Paper}
        square
        elevation={0}
        py={2}
      >
        {isLoaded ? (
          group.name ? (
            <Container maxWidth="sm">
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
                    {/* {group.research_Topic.name} */}
                  </Typography>
                  <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                    Supervisor :{" "}
                    <span style={{ color: "#E28743" }}>
                      {group.supervisor ? group.supervisor.name : "N/A"}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                    Co-Supervisor :{" "}
                    <span style={{ color: "#E28743" }}>
                      {" "}
                      {group.coSupervisor ? group.coSupervisor.name : "N/A"}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                    Student Count :{" "}
                    <span style={{ color: "#E28743" }}>
                      {group.members.length}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                    Group Leader :{" "}
                    <span style={{ color: "#E28743" }}>
                      {" "}
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
                        {group.pannel && group.pannel.length > 0 ? (
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
                                </Box>
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
                  <Button
                    color="success"
                    variant="contained"
                    onClick={leftGroup}
                  >
                    Leave from group
                  </Button>
                </Box>
              </Box>
            </Container>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default Group;
