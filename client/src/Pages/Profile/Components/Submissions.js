import { Box, Paper, Skeleton, Typography } from "@mui/material";
import Heading from "../../../Components/Heading";
import SingleSubmission from "../Util/Submission";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Submission() {
  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //data
  const [docs, setDocs] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`${URL}documents/users/${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoaded(true);
        if (res.data) {
          setDocs(res.data);
        }
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);
  return (
    <>
      <Paper elevation={4}>
        <Box
          p={2}
          sx={{ bgcolor: "#073050", borderRadius: "3px", textAlign: "center" }}
          minHeight={"73vh"}
        >
          <Heading heading={`Submissions`} />
          {isLoaded ? (
            docs.length > 0 ? (
              docs.map((row, index) => {
                return <SingleSubmission key={index} data={row} />;
              })
            ) : (
              <Typography sx={{ textAlign: "center", color: "#777", mt: 3 }}>
                No Submissions
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
            </>
          )}
        </Box>
      </Paper>
    </>
  );
}

export default Submission;
