import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
  List,
  Skeleton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import GroupRequest from "./GroupRequest";
import { TransitionGroup } from "react-transition-group";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function RPMAccordion() {
  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //state
  const [users, setUsers] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [grp_id, setGrpID] = useState("");

  //useEffect
  useEffect(() => {
    axios
      .get(`${URL}users/${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setGrpID(res.data.group_id);
        axios
          .get(`${URL}groups/requests/${res.data.group_id}`, {
            headers: { Authorization: "Agriuservalidation " + token },
          })
          .then((res) => {
            setLoaded(true);
            if (res.data) {
              setUsers(res.data);
            }
          })
          .catch((er) => {
            setLoaded(true);
          });
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      <Accordion sx={{ bgcolor: "#0C4D82" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Grouping requests</Typography>
        </AccordionSummary>
        {isLoaded ? (
          <AccordionDetails>
            <List>
              <TransitionGroup>
                {!!users ? (
                  users.map((row, index) => {
                    return (
                      <Collapse key={index}>
                        <GroupRequest grp_id={grp_id} data={row} />
                      </Collapse>
                    );
                  })
                ) : (
                  <Typography sx={{ color: "#bbb" }}></Typography>
                )}
              </TransitionGroup>
            </List>
          </AccordionDetails>
        ) : (
          <Box px={2}>
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
          </Box>
        )}
      </Accordion>
    </>
  );
}

export default RPMAccordion;
