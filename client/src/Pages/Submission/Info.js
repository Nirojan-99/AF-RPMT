import {
  Box,
  Button,
  Container,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

//react
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

//utils
import { timeParser, dateParser } from "../../Utils/TimeFormatter";

function Info(props) {
  //user data
  const { token, role, URL } = useSelector((state) => state.loging);

  //submission id
  const { id } = useParams();

  //state
  const [submission, setSubmission] = useState();
  const [isLoaded, setLoaded] = useState(false);

  //useEffect call
  useEffect(() => {
    axios
      .get(`${URL}submissions/${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoaded(true);
        if (res.data) {
          setSubmission(res.data.data);
        }
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Box minHeight={"81vh"} component={Paper} elevation={1} square p={0.5}>
        {isLoaded ? (
          submission ? (
            <Container
              sx={{ mt: 4 }}
              component={Paper}
              variant="outlined"
              maxWidth={"sm"}
            >
              <Typography sx={{ my: 2, fontSize: "1.3rem", color: "#116BB1" }}>
                {submission.title}
              </Typography>
              <Typography
                sx={{
                  my: 2,
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: { xs: ".8rem", sm: ".9rem" },
                }}
              >
                {submission.description}
              </Typography>
              <Typography
                sx={{
                  color: "#aaa",
                  fontWeight: "700",
                  mb: 2,
                  fontSize: { xs: ".7rem", sm: ".9rem" },
                }}
              >
                Due Date :{" "}
                {dateParser(submission.due_date) +
                  " - " +
                  timeParser(submission.due_time)}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row" }} mb={2}>
                <PictureAsPdfIcon sx={{ fontSize: 30 }} />
                <Button
                  sx={{
                    color: "#116BB1",
                    textTransform: "none",
                    fontWeight: "700",
                  }}
                  href={submission.document}
                >
                  {submission.title}
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                {role === "Student" && (
                  <Button
                    sx={{
                      color: "#116BB1",
                      textTransform: "none",
                      fontWeight: "700",
                    }}
                    variant="outlined"
                    color="info"
                    href={"/submit/add/" + submission._id}
                  >
                    Add Submisson
                  </Button>
                )}
              </Box>
            </Container>
          ) : (
            <Typography
              sx={{ color: "#bbb", textAlign: "center", mt: 4, fontSize: 20 }}
            >
              No Data available
            </Typography>
          )
        ) : (
          <Container sx={{ mt: 3 }} maxWidth={"sm"}>
            <Skeleton
              animation="pulse"
              variant="rectangular"
              sx={{ borderRadius: 1, mb: 2 }}
              width={"100%"}
              height={450}
            />
          </Container>
        )}
      </Box>
    </>
  );
}

export default Info;
