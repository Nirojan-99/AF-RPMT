import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BackupIcon from "@mui/icons-material/Backup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TocIcon from "@mui/icons-material/Toc";

//utils
import { timeParser, dateParser } from "../../Utils/TimeFormatter";

function Content(props) {
  //hook
  const navigate = useNavigate();

  //user data
  const { role } = useSelector((state) => state.loging);

  return (
    <>
      <Box
        my={3}
        pt={0.5}
        pl={{ xs: 1, sm: 2 }}
        minHeight="50px"
        sx={{
          bgcolor: "#1385E1",
          borderRadius: 1,
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
            <Grid
              container
              direction={"column"}
              alignItems={"start"}
              justifyContent={"start"}
              sx={{ ml: { xs: 1, sm: 0 } }}
            >
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    navigate("/submission/" + props.data._id);
                  }}
                >
                  <TocIcon
                    sx={{
                      color: "#073050",
                      pr: 0.5,
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                  <Typography
                    align="left"
                    sx={{
                      cursor: "pointer",
                      fontSize: { xs: 15, sm: 17 },
                      textTransform: "none",
                      color: "#073050",
                      textTransform: "capitalize",
                    }}
                  >
                    {props.data.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid display={{ xs: "block", sm: "none" }} item>
                <Typography
                  noWrap
                  fontSize={11}
                  fontWeight={"bold"}
                  variant="h4"
                  align="left"
                  sx={{ color: "#073050", fontFamily: "Arial" }}
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
              sx={{ color: "#073050", fontFamily: "Arial" }}
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
                variant="outlined"
                size="small"
                disableElevation
                href={
                  (role === "Admin"
                    ? "/submission/edit/" + props.data._id
                    : "/submit/add/" + props.data._id)
                }
                startIcon={<BackupIcon />}
                sx={{
                  color: "#333",
                  textTransform: "capitalize",
                  fontFamily: "open sans",
                  fontSize: { xs: 12, sm: 15 },
                  borderColor: "#99ddff",
                  bgcolor: "#99ddff",
                  "&:hover": { bgcolor: "#073050", color: "#fff" },
                }}
              >
                {role === "Admin" && "Edit"}
                {role === "Staff" && "View"}
                {role === "Student" && "Submit"}
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Content;
