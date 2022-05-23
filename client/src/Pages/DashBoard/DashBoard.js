import { Container, Box, Paper, IconButton, Skeleton } from "@mui/material";
import Header from "../../Components/Header";
import {
  Timeline,
  TimelineConnector,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import SingleTimelineItem from "./SingleTimelineItem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ArticleIcon from "@mui/icons-material/Article";
import AddBoxIcon from "@mui/icons-material/AddBox";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashBoard(props) {
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
      <Header mode={props.mode} handler={props.handler} />

      <Paper elevation={2} square>
        <Box width="100%" minHeight={"83vh"}>
          <Container maxWidth="md" sx={{ textAlign: "left" }}>
            <Box py={3}>
              <Paper elevation={3}>
                <Box p={1} sx={{ bgcolor: "#073050", borderRadius: "3px" }}>
                  <Timeline position="right">
                    {role === "Admin" && <NewSubmission />}
                    {isLoaded ? (
                      submissions.length > 0 ? (
                        submissions.map((row, index) => {
                          return (
                            <SingleTimelineItem
                              data={row}
                              key={index}
                              icon="doc"
                            />
                          );
                        })
                      ) : (
                        <></>
                      )
                    ) : (
                      <>
                        <SubSkelton />
                        <SubSkelton />
                        <SubSkelton />
                      </>
                    )}
                  </Timeline>
                </Box>
              </Paper>
            </Box>
          </Container>
        </Box>
      </Paper>
    </>
  );
}

const SubSkelton = () => {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        style={{
          maxWidth: "1px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      />
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot color="info">
          <AddBoxIcon
            sx={{
              height: "30px",
              width: "30px",
              cursor: "pointer",
              color: "#1071bc",
            }}
          />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ textAlign: "center", my: 3 }}>
        <Skeleton
          animation="pulse"
          variant="rectangular"
          sx={{ borderRadius: 1 }}
          width={"100%"}
          height={"100%"}
        />
        <Box my={1} pt={1} pl={{ xs: 1, sm: 2 }} minHeight="40px"></Box>
      </TimelineContent>
    </TimelineItem>
  );
};

const NewSubmission = () => {
  const navigate = useNavigate();
  return (
    <TimelineItem>
      <TimelineOppositeContent
        style={{
          maxWidth: "1px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      />
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot color="info">
          <AddBoxIcon
            onClick={() => {
              navigate("/submission/new");
            }}
            sx={{
              height: "30px",
              width: "30px",
              cursor: "pointer",
              color: "#1071bc",
            }}
          />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ textAlign: "center" }}>
        <Box
          my={3}
          pt={0.5}
          pl={{ xs: 1, sm: 2 }}
          minHeight="50px"
          onClick={() => {
            navigate("/submission/new");
          }}
          sx={{
            bgcolor: "#1385E1",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "#073050",
            textAlign: "center",
            "&:hover": {
              bgcolor: "#888",
              color: "#fff",
            },
          }}
        >
          Add new submission
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};
export default DashBoard;
