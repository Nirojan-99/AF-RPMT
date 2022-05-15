//mui
import { Typography, TextField, Grid, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  container: {
    width: "100%",
  },
  heading: {
    fontFamily: "Open Sans",
    fontWeight: "bold",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  form_conatiner: {
    padding: "4rem",
  },
  input_margin: {
    padding: "0",
  },
  button_margin: {
    marginTop: "5",
    marginBottom: "10",
  },
});

function SignInForm() {
  const classes = useStyle();
  return (
    <Box height={{ sm: "35rem", md: "35rem" }}>
      <Grid
        sx={{ height: "100%" }}
        container
        alignContent="center"
        justifyContent="center"
        spacing={0}
      >
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Typography
            mt={2}
            mb={2}
            className={classes.heading}
            variant="h3"
            align="center"
          >
            Welcome Back,
          </Typography>
          <Box mb={1}>
            <TextField
              mt={4}
              color="primary"
              fullWidth
              className={classes.input_margin}
              margin="normal"
              id="email"
              label="Email"
              variant="outlined"
              size="medium"
            />
          </Box>
          <TextField
            mt={4}
            fullWidth
            className={classes.input_margin}
            margin="normal"
            id="Password"
            label="Password"
            variant="outlined"
            size="medium"
          />
          <Typography align="right">
            <Box mt={1} mb={1}>
              <Button
                href="/"
                style={{ textTransform: "lowercase" }}
                variant="text"
                color="info"
              >
                forget password?
              </Button>
            </Box>
          </Typography>
          <Box mt={2} mb={3}>
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color="success"
              className={classes.button_margin}
            >
              Sign In
            </Button>
          </Box>
          {/* </FormControl> */}
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
}

export default SignInForm;
