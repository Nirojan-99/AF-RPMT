import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Confirmation from "../../Components/Confirmation";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users(props) {
  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  //data
  const [users, setUsers] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isDeleteClicked, setClicked] = useState(false);
  const [search, setSearch] = useState("");

  //deleting user data
  const [id, setID] = useState("");
  const [index, setIndex] = useState("");

  //useEffect call
  useEffect(() => {
    setPage(1);
    axios
      .get(`${URL}users?page=${page}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoaded(true);
        setUsers(res.data.data);
        setCount(Math.ceil(+res.data.count / 20));
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, [page]);

  //page change[pagination]
  const handleChange = (event, value) => {
    setPage(value);
  };

  //click delete
  const clickDelete = (id, index) => {
    setID(id);
    setIndex(index);
    setClicked(true);
  };

  //handle yes
  const DeleteUser = () => {
    axios
      .delete(`${URL}users/${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setUsers((pre) => {
          const array = [...pre];
          array.splice(index, 1);
          return array;
        });
        setID("");
        setIndex("");
        setClicked(false);
      })
      .catch((er) => {
        setID("");
        setIndex("");
        setClicked(false);
        toast("Unable to delete,try again", { type: "error" });
      });
  };

  //search
  const searchHandler = () => {
    // setPage(1);
    search.trim();
    setUsers([]);
    setLoaded(false);
    axios
      .get(`${URL}users?search=${search}&page=${page}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        // setPage(Math.ceil(+res.data.count / 20));
        setLoaded(true);
        setUsers(res.data.data);
      })
      .catch((er) => {
        setLoaded(true);
        console.log(er);
      });
  };

  return (
    <>
      <ToastContainer />
      <Confirmation
        open={isDeleteClicked}
        handleClose={() => {
          setClicked(false);
        }}
        handleYes={DeleteUser}
      />
      <Header handler={props.handler} />
      <Box component={Paper} elevation={0} square py={2} minHeight={"78vh"}>
        <Container
          maxWidth={"md"}
          sx={{ p: 2 }}
          component={Paper}
          variant={"outlined"}
        >
          <Typography variant="h4" sx={{ color: "#E28743" }}>
            Users of the System
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }} my={2}>
            <TextField
              // onKeyDown={searchHandler}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              margin="none"
              fullWidth
              label="Search Users"
              autoFocus
              color="info"
            ></TextField>
            <IconButton
              onClick={searchHandler}
              size="large"
              sx={{
                borderRadius: 1,
                bgcolor: "#E28743",
                "&:hover": { bgcolor: "#1071bc" },
              }}
            >
              <ManageSearchIcon size="large" />
            </IconButton>
          </Box>
          <Divider />
          <Box py={1} mt={3}>
            {isLoaded ? (
              <>
                {users.length > 0 ? (
                  users.map((row, index) => {
                    return (
                      <UserRow
                        deleteHandler={clickDelete}
                        key={index}
                        index={index}
                        data={row}
                      />
                    );
                  })
                ) : (
                  <>
                    <Typography sx={{ color: "red" }}>
                      No users found
                    </Typography>
                  </>
                )}
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
          </Box>
          <Box
            my={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Pagination
              onChange={handleChange}
              color="standard"
              count={count}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

const UserRow = (props) => {
  return (
    <Box
      component={Paper}
      variant={"outlined"}
      p={1.3}
      mb={1.6}
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={6}>
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "left", md: "center" }}
            justifyContent="left"
          >
            <Grid>
              <Avatar
                sx={{ height: 50, width: 50 }}
                src={props.data.dp}
              ></Avatar>
            </Grid>
            <Grid>
              <Box ml={{ xs: 0, md: 1 }}>
                <Typography sx={{ fontSize: 15, color: "#1071bc" }}>
                  {props.data.name}
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#1071bc" }}>
                  {props.data.email}
                </Typography>
              </Box>
            </Grid>
            <Grid display={{ xs: "block", md: "none" }}>
              <Typography sx={{ fontSize: 13, color: "#1071bc" }}>
                {props.data.role}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={0}
          md={2}
          sx={{ textAlign: "left" }}
          display={{ xs: "none", md: "block" }}
        >
          <Typography sx={{ fontSize: 13, color: "#1071bc" }}>
            {props.data.role}
          </Typography>
        </Grid>
        <Grid item xs={6} md={4} sx={{ textAlign: "right" }}>
          <Tooltip title="edit">
            <IconButton
              href={`/user/${props.data._id}`}
              sx={{ bgcolor: "#555", mr: 2 }}
              size="large"
            >
              <ModeEditIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete">
            <IconButton
              onClick={() => {
                props.deleteHandler(props.data._id, props.index);
              }}
              sx={{ bgcolor: "#555" }}
              size="large"
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Users;
