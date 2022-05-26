import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BackupIcon from "@mui/icons-material/Backup";
import EditIcon from "@mui/icons-material/Edit";

//utils
import { timeParser, dateParser } from "../../Utils/TimeFormatter";

function Content(props) {
  return (
    <>
      <Box
        my={3}
        pt={0.5}
        pl={{ xs: 1, sm: 2 }}
        // height={"50px"}
        minHeight="50px"
        sx={{
          bgcolor: "#1385E1",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <Grid item sm={4} xs={6}>
            <Grid container direction={"row"}>
              <Grid item>
                <Button
                  href={"/submission/" + props.data._id}
                  align="left"
                  sx={{
                    fontSize: { xs: 10, sm: 15 },
                    textTransform: "none",
                    color: "#073050",
                  }}
                >
                  {props.data.title}
                </Button>
              </Grid>
              <Grid display={{ xs: "block", sm: "none" }} item>
                <Typography
                  noWrap
                  fontSize={11}
                  fontWeight={"bold"}
                  variant="h4"
                  align="left"
                  sx={{ color: "#DFDADA", fontFamily: "Arial" }}
                >
                  {dateParser(props.data.due_date) +
                    " - " +
                    timeParser(props.data.due_time)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} display={{ xs: "none", sm: "block" }}>
            <Typography
              fontSize={13}
              fontWeight={"bold"}
              variant="h4"
              align="left"
              sx={{ color: "#DFDADA", fontFamily: "Arial" }}
            >
              <Grid
                container
                justifyContent="left"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <CalendarMonthIcon />
                </Grid>
                <Grid item>
                  {dateParser(props.data.due_date) +
                    " - " +
                    timeParser(props.data.due_time)}
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid xs={6} sm={3}>
            <Typography variant="h4">
              <Button
                variant="contained"
                size="small"
                disableElevation
                href={"/submit/add/" + props.data._id}
                startIcon={props.icon === "doc" ? <BackupIcon /> : <EditIcon />}
                color="secondary"
                sx={{ textTransform: "none", fontFamily: "open sans" }}
              >
                Submit
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Content;
