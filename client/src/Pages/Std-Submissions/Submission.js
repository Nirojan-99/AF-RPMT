import { Grid, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import { dateParser } from "../../Utils/TimeFormatter";

function ASubmission(props) {
  let history = useNavigate();

  const submissionHandler = () => {
    history("/submissions/std/" + props.data._id);
  };

  const [group, setGroup] = useState();
  const [isLoaded, setLoaded] = useState(false);

  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  useEffect(() => {
    axios
      .get(`${URL}groups/admin/${props.data.group_id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        console.log(res.data);
        setGroup(res.data);
        setLoaded(true);
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      {isLoaded ? (
        <Box
          my={1}
          mx={2}
          p={1.2}
          px={2}
          bgcolor="#1385E1"
          borderRadius={1}
          onClick={submissionHandler}
          sx={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
        >
          <Typography variant="h4" sx={{ color: "#FFFFFF" }}>
            {group.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h4">
            {dateParser(props.data.submmited_date)}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h4" sx={{ color: "#333" }}>
            {props.data.status}
          </Typography>
        </Box>
      ) : (
        <Skeleton
          animation="pulse"
          variant="rectangular"
          sx={{ borderRadius: 1, mb: 2 }}
          width={"100%"}
          height={50}
        />
      )}
    </>
  );
}

export default ASubmission;
