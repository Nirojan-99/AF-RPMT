import { Box, Button, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

//react
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Groups() {
  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //data
  const [groups, setGroups] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  //useEffect call
  useEffect(() => {
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
  }, []);

  return (
    <>
      <Box minHeight={"72vh"} p={3}>
        <Grid
          container
          alignItems="center"
          justifyContent={"space-evenly"}
          spacing={1}
        >
          {isLoaded ? (
            <>
              {groups.length > 0 &&
                groups.map((row, index) => {
                  return <Group data={row} key={index} />;
                })}
            </>
          ) : (
            <>
              <GroupSkelton />
              <GroupSkelton />
              <GroupSkelton />
              <GroupSkelton />
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}
const GroupSkelton = () => {
  return (
    <Grid
      item
      sx={{
        m: 0,
        minWidth: 350,
      }}
    >
      <Skeleton
        animation="pulse"
        variant="rectangular"
        sx={{ borderRadius: 1, mb: 1.3 }}
        width={"100%"}
        height={150}
      />
    </Grid>
  );
};

const Group = (props) => {
  const navigate = useNavigate();
  return (
    <Grid
      component={Paper}
      variant="outlined"
      item
      onClick={() => {
        navigate("/research/grp/" + props.data._id);
      }}
      sx={{
        p: 2,
        m: 2,
        cursor: "pointer",
        "&:hover": { bgcolor: "#333" },
        minWidth: 300,
      }}
    >
      <Box>
        <Typography sx={{ color: "#1071bc", fontSize: 18 }}>
          {props.data.name}
        </Typography>
        <Typography sx={{ color: "#888", fontSize: 14 }}>
          {props.data.research_Topic.name}
        </Typography>
        <Typography sx={{ color: "#ccc", fontSize: 13 }}>
          Supervisor :{" "}
          <span style={{ color: "#E28743" }}>
            {props.data.supervisor ? props.data.supervisor.name : "N/A"}
          </span>
        </Typography>
        <Typography sx={{ color: "#ccc", fontSize: 13 }}>
          Co-Supervisor :{" "}
          <span style={{ color: "#E28743" }}>
            {" "}
            {props.data.coSupervisor ? props.data.coSupervisor.name : "N/A"}
          </span>
        </Typography>
        <Typography sx={{ color: "#ccc", fontSize: 13 }}>
          Student Count :{" "}
          <span style={{ color: "#E28743" }}>{props.data.members.length}</span>
        </Typography>
        {true && (
          <Button
            sx={{ textTransform: "none", mt: 1 }}
            variant="outlined"
            disabled
            color="success"
            startIcon={<BookmarkAddedIcon />}
          >
            {props.data.research_Topic.status === "accept"
              ? "Topic Accepted"
              : "Topic Pending"}
          </Button>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Grid>
  );
};
export default Groups;
