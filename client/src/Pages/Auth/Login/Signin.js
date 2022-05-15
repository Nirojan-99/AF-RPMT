import SideImage from "./SideImage";
import Form from "./Form";
import Header from "../../../Components/Header";

//mui
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  container1: {
    paddingTop: "3rem",
    width: "100%",
    margin: "0",
  },
  card: {},
  paperCard: {
    height: "100%",
  },
  paperContainer: {
    paddingBottom: "3rem",
  },
});

function SignIn(props) {
  const classes = useStyles();

  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Paper className={classes.paperContainer} square elevation={0}>
        <Box className={classes.container1}>
          <Grid
            justifyContent="center"
            alignItems="stretch"
            direction="row"
            container
            spacing={0}
          >
            <Grid item xs={1} sm={1} md={1} lg={2}></Grid>
            <Grid item className={classes.card} xs={10} sm={6} md={7} lg={5}>
              <Paper className={classes.paperCard} square elevation={4}>
                <Form />
              </Paper>
            </Grid>
            <Grid
              className={classes.card}
              item
              xs={0}
              sm={4}
              md={3}
              lg={3}
              display={{ xs: "none", sm: "block" }}
            >
              <Paper>
                <SideImage
                  heading="New here?"
                  subheading="Signup and continue your research!"
                />
              </Paper>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={2}></Grid>
            <Grid
              className={classes.card}
              item
              xs={10}
              display={{ xs: "block", sm: "none" }}
            >
              <SideImage
                heading="New here?"
                subheading="Signup and continue your research!"
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default SignIn;
