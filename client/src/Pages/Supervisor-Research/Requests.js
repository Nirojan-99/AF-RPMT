import { Box, Button, Grid, Skeleton, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

//react
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Requests() {
  //data
  const [groups, setGroups] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //useEffect call
  useEffect(() => {
    axios
      .get(`${URL}users/staff/${userID}/groups?request=true`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setGroups(res.data);
        console.log(res.data);
        setLoaded(true);
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  //accept / reject
  const submit = (status, role, index, id) => {
    axios
      .put(
        `${URL}groups/${userID}/requests/${id}`,
        {
          role,
          status,
        },
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then(() => {
        setGroups((pre) => {
          const array = [...pre];
          array.splice(index, 1);
          return array;
        });
      })
      .catch((er) => {
        toast("Unable to " + status + "try again", { type: "error" });
      });
  };

  return (
    <>
      <ToastContainer />
      <Box minHeight={"72vh"} p={3}>
        {isLoaded ? (
          <>
            {groups.length > 0 &&
              groups.map((row, index) => {
                return (
                  <Request
                    submit={submit}
                    index={index}
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
              height={150}
            />
            <Skeleton
              animation="pulse"
              variant="rectangular"
              sx={{ borderRadius: 1, mb: 2 }}
              width={"100%"}
              height={150}
            />
            <Skeleton
              animation="pulse"
              variant="rectangular"
              sx={{ borderRadius: 1, mb: 2 }}
              width={"100%"}
              height={150}
            />
          </>
        )}
      </Box>
    </>
  );
}
const Request = (props) => {
  //user data
  const { userID } = useSelector((state) => state.loging);

  const role =
    props.data.requested.supervisor == userID ? "supervisor" : "coSupervisor";

  return (
    <Grid
      component={Paper}
      variant="outlined"
      container
      sx={{
        p: 2,
        my: 2.5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid item>
        <Typography sx={{ color: "#1071bc", fontSize: 20 }}>
          {props.data.name}
        </Typography>
        <Typography sx={{ color: "#888", fontSize: 15 }}>
          {props.data.research_Topic.name}
        </Typography>
        <Typography sx={{ color: "#ccc", fontSize: 15 }}>
          Supervisor :
          <span style={{ color: "#E28743" }}>
            {props.data.supervisor ? props.data.supervisor.name : "N/A"}
          </span>
        </Typography>
        <Typography sx={{ color: "#ccc", fontSize: 15 }}>
          Co-Supervisor :{" "}
          <span style={{ color: "#E28743" }}>
            {props.data.coSupervisor ? props.data.coSupervisor.name : "N/A"}
          </span>
        </Typography>
        <Typography sx={{ color: "#ccc", fontSize: 15 }}>
          Members :{" "}
          <span style={{ color: "#E28743" }}>
            {props.data.members.length > 0 &&
              props.data.members.map((row) => {
                return row.name + " - ";
              })}
          </span>
        </Typography>
      </Grid>
      <Box sx={{ flexGrow: 1 }} />
      <Grid item xs={12} sm={2.2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "column", xs: "row" },
            mt: { xs: 2, sm: 0 },
          }}
        >
          <Button
            onClick={() => {
              props.submit("accept", role, props.index, props.data._id);
            }}
            variant="contained"
            disableElevation
            color="success"
            sx={{ mb: { sm: 2, xs: 0 }, fontSize: { xs: 12, sm: 15 } }}
            startIcon={<ThumbUpAltIcon />}
          >
            Accept
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={() => {
              props.submit("reject", role, props.index, props.data._id);
            }}
            sx={{ fontSize: { xs: 12, sm: 14 } }}
            variant="contained"
            disableElevation
            color="error"
            startIcon={<ThumbDownIcon />}
          >
            Reject
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Requests;
