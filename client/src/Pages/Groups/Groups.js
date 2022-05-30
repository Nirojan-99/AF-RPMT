import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import SearchIcon from "@mui/icons-material/Search";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Groups(props) {
  //user data
  const { userID, token, URL } = useSelector((state) => state.loging);

  //state
  const [isLoaded, setLoaded] = useState(false);
  const [groups, setGroups] = useState([]);
  const [displayGroups, setDisplayGroups] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  //useEffect call
  useEffect(() => {
    axios
      .get(`${URL}groups`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoaded(true);
        if (res.data) {
          setGroups(res.data);
          setDisplayGroups(res.data);
        }
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  //search
  const searchHandler = () => {
    if (searchVal.trim()) {
      setDisplayGroups(() => {
        const array = groups.filter((row) => {
          if (row.name.toLowerCase().includes(searchVal.toLowerCase())) {
            return row;
          }
        });
        return array;
      });
    } else {
      setDisplayGroups(groups);
    }
  };

  return (
    <>
      <Header handler={props.handler} />
      <Box component={Paper} square elevation={0} minHeight="80vh" py={2}>
        <Container maxWidth="sm">
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              value={searchVal}
              onChange={(event) => {
                setSearchVal(event.target.value);
              }}
              autoFocus
              size="small"
              color="success"
              margin="none"
              fullWidth
              label="Group name"
              onKeyDown={searchHandler}
            />
            <IconButton
              onClick={searchHandler}
              sx={{
                bgcolor: "#fff",
                borderRadius: 0.5,
                "&:hover": { bgcolor: "#E28743" },
              }}
            >
              <SearchIcon sx={{ color: "#333" }} />
            </IconButton>
          </Box>
        </Container>
        <Container maxWidth="md">
          <Box mt={3} p={2}>
            <Grid
              container
              direction={"row"}
              justifyContent="center"
              alignItems={"stretch"}
              spacing={2}
              minHeight="25vh"
            >
              {isLoaded ? (
                displayGroups.length > 0 ? (
                  displayGroups.map((row, index) => {
                    return <Group key={index} data={row} />;
                  })
                ) : (
                  <Typography sx={{ color: "#ccc" }}>No Group found</Typography>
                )
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
        </Container>
      </Box>
    </>
  );
}
const GroupSkelton = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Skeleton
        animation="pulse"
        variant="rectangular"
        sx={{ borderRadius: 1, mb: 2 }}
        width={"100%"}
        height={130}
      />
    </Grid>
  );
};
const Group = (props) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        sx={{ cursor: "pointer" }}
        component={Paper}
        elevation={2}
        p={2}
        onClick={() => {
          navigate("/groups/" + props.data._id);
        }}
      >
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
            {props.data.coSupervisor ? props.data.coSupervisor.name : "N/A"}
          </span>
        </Typography>
        <Typography sx={{ color: "#ccc", fontSize: 13 }}>
          Student Count :{" "}
          <span style={{ color: "#E28743" }}>{props.data.members.length}</span>
        </Typography>
      </Box>
    </Grid>
  );
};
export default Groups;
