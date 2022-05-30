import {
  Container,
  Box,
  Paper,
  Skeleton,
  Typography,
  Grid,
} from "@mui/material";
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
import SingleTimelineItem from "./SignleTimelineItem";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { dateParser } from "../../Utils/TimeFormatter";
import Calendar from "../../Components/Calendar/Calendar";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashBoard(props) {
  //user data
  const { token, role, URL } = useSelector((state) => state.loging);

  //state
  const [submissions, setSubmissions] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [dates, setDates] = useState([]);

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
          let array = [];
          res.data.data.filter((row) => {
            array.push(dateParser(row.due_date));
          });
          setDates(array);
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
          <Container maxWidth="lg" sx={{ textAlign: "left" }}>
            <Grid container justifyContent={"space-evenly"}>
              <Grid item xs={12} md={8}>
                <Box py={3}>
                  <Paper elevation={3}>
                    <Box
                      p={{ xs: 0.2, sm: 1 }}
                      sx={{ bgcolor: "#073050", borderRadius: "3px" }}
                    >
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
                            <Typography sx={{ color: "#fff" }}>
                              {role !== "Admin" && "No Submissions available"}
                            </Typography>
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
              </Grid>
              <Grid item md={4}>
                <Box ml={{ xs: 0, md: 1 }} py={{ xs: 1, md: 3 }}>
                  <Calendar />
                </Box>
              </Grid>
            </Grid>
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
          <Skeleton
            animation="pulse"
            variant="circular"
            sx={{ borderRadius: 1 }}
            width={30}
            height={30}
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
        <Box my={1} pt={1} pl={{ xs: 1, sm: 2 }} minHeight="30px"></Box>
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
              bgcolor: "#E28743",
              color: "#fff",
            },
            transitionDuration: ".4s",
          }}
        >
          Add new submission
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};
export default DashBoard;
