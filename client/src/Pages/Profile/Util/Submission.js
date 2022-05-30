import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  List,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { dateParser } from "../../../Utils/TimeFormatter";

function Submission(props) {
  return (
    <>
      <Accordion sx={{ bgcolor: "#0F76CA", marginTop: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "open sans",
              fontWeight: "700",
              fontSize: "17px",
            }}
          >
            {props.data.submission_id.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <Divider sx={{ marginBottom: 1 }} />
            <Grid
              container
              alignItems={"center"}
              justifyContent="start"
              sx={{ textAlign: "left" }}
            >
              <Grid item xs={5}>
                <Typography sx={{ color: "#333" }} variant="h4">
                  Submitted Date :
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography sx={{ color: "#333" }} variant="h4">
                  {dateParser(props.data.submmited_date)}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ marginBottom: 1, marginTop: 2 }} />
            <Grid
              container
              alignItems={"center"}
              justifyContent="start"
              sx={{ textAlign: "left" }}
            >
              <Grid item xs={5}>
                <Typography sx={{ color: "#333" }} variant="h4">
                  Status
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography sx={{ color: "#333" }} variant="h4">
                  {props.data.status}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ marginBottom: 1, marginTop: 2 }} />
            <Grid
              container
              alignItems={"center"}
              justifyContent="start"
              sx={{ textAlign: "left" }}
            >
              <Grid item xs={5}>
                <Typography sx={{ color: "#333" }} variant="h4">
                  Grade
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography sx={{ color: "#333" }} variant="h4">
                  {props.data.grade ? props.data.grade : "N/A"}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ marginBottom: 1, marginTop: 2 }} />
            <Grid
              container
              alignItems={"center"}
              justifyContent="start"
              sx={{ textAlign: "left" }}
            >
              <Grid item xs={5}>
                <Typography sx={{ color: "#333" }} variant="h4">
                  Comments :
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography sx={{ color: "#333" }} variant="h4">
                  {props.data.comments ? props.data.comments : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default Submission;
