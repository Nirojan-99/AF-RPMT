import { Paper, Box, Skeleton } from "@mui/material";
import { Container } from "@mui/material";
import Heading from "../../Components/Heading";
import Header from "../../Components/Header";
import Submission from "./Submission";
import { makeStyles } from "@mui/styles";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function AllSubmissions(props) {
  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //state
  const [submissions, setSubmissions] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const { id } = useParams();

  //useEffect call
  useEffect(() => {
    axios
      .get(`${URL}documents/staff/${userID}?submisson=${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        console.log(res.data)
        setLoaded(true);
        setSubmissions(res.data);
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Paper elevation={2} square>
        <Box width="100%" minHeight={"83vh"}>
          <Container maxWidth="sm" sx={{ textAlign: "center" }}>
            <Box py={3}>
              <Paper elevation={3}>
                <Box p={1} sx={{ bgcolor: "#073050", borderRadius: "3px" }}>
                  <Heading heading={`All Submissions`} />
                  <Container maxWidth="sm">
                    {isLoaded ? (
                      submissions.length > 0 ? (
                        submissions.map((row, index) => {
                          return <Submission key={index} data={row} />;
                        })
                      ) : (
                        <>No data available</>
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
                  </Container>
                </Box>
              </Paper>
            </Box>
          </Container>
        </Box>
      </Paper>
    </>
  );
}

export default AllSubmissions;
