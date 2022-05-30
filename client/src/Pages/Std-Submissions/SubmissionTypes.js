import { Box, Skeleton, Container, Paper, Typography } from "@mui/material";
import Header from "../../Components/Header";
//react
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function SubmissionTypes(props) {
  //user data
  const { token, userID, role, URL } = useSelector((state) => state.loging);

  //state
  const [submissions, setSubmissions] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  //use effct call
  useEffect(() => {
    axios
      .get(`${URL}submissions`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoaded(true);
        if (res.data) {
          setSubmissions(res.data.data);
        }
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      <Header handler={props.handler} />
      <Box component={Paper} square elevation={0} minHeight="77vh" py={2.5}>
        <Container maxWidth="sm">
          <Box
            component={Paper}
            variant="outlined"
            p={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>All Submissions</Typography>
            <Box
              my={2}
              width={"100%"}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLoaded ? (
                submissions ? (
                  submissions.map((row, index) => {
                    return <SingleSubmissionTypes key={index} data={row} />;
                  })
                ) : (
                  <Typography
                    sx={{ textAlign: "center", color: "#888", mt: 3 }}
                  >
                    No submissions available
                  </Typography>
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
        </Container>
      </Box>
    </>
  );
}

const SingleSubmissionTypes = (props) => {
  const navigate = useNavigate();
  return (
    <Box
      width={"100%"}
      component={Paper}
      elevation={1}
      py={2}
      px={1}
      mb={2}
      onClick={() => {
        navigate("/submissions/" + props.data._id);
      }}
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ color: "#1071bc", ml: 2 }}>
        {props.data.title}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
};

export default SubmissionTypes;
