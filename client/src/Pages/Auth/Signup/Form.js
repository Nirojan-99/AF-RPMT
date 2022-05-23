//mui
import {
  Divider,
  Select,
  MenuItem,
  Typography,
  TextField,
  Grid,
  Button,
  Box,
} from "@mui/material";
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
    <Box>
      <Grid container alignContent="center" justifyContent="center" spacing={0}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          {/* <FormControl fullWidth margin="normal" variant="outlined"> */}
          <Typography
            mt={1}
            mb={2}
            className={classes.heading}
            variant="h3"
            align="center"
          >
            SIGN UP
          </Typography>
          <Box mb={1}>
            <TextField
              mt={4}
              fullWidth
              className={classes.input_margin}
              margin="normal"
              id="name"
              label="User Name"
              variant="outlined"
              size="medium"
              color="success"
            />
          </Box>
          <Box mb={1}>
            <TextField
              mt={4}
              fullWidth
              className={classes.input_margin}
              margin="normal"
              id="email"
              label="Email"
              variant="outlined"
              size="medium"
              color="success"
            />
          </Box>
          <Box mb={1}>
            <TextField
              mt={4}
              fullWidth
              className={classes.input_margin}
              margin="normal"
              id="number"
              label="Contact Number"
              variant="outlined"
              size="medium"
              color="success"
            />
          </Box>
          <Box mb={1}>
            <TextField
              mt={4}
              fullWidth
              className={classes.input_margin}
              margin="normal"
              id="password"
              label="Password"
              variant="outlined"
              size="medium"
              color="success"
            />
          </Box>
          <Box mb={1}>
            {/* <TextField
              mt={4}
              fullWidth
              className={classes.input_margin}
              margin="normal"
              id="role"
              label="Role"
              variant="outlined"
              size="medium"
              color="success"
            /> */}
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="Role"
              // value={age}
              placeholder="Role"
              // onChange={handleChange}
            >
              <MenuItem value={"Student"}>Student</MenuItem>
              <MenuItem value={"Staff"}>Staff</MenuItem>
            </Select>
          </Box>
          <Box mb={1}>
            <TextField
              mt={4}
              fullWidth
              className={classes.input_margin}
              margin="normal"
              id="NIC"
              label="NIC"
              variant="outlined"
              size="medium"
              color="success"
            />
          </Box>
          <Box>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="gender"
              // value={age}
              placeholder="Gender"
              // onChange={handleChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <Divider />
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </Box>
          <Box mt={3} mb={3}>
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color="success"
              className={classes.button_margin}
            >
              Sign up
            </Button>
            <Box sx={{ display: "flex" }} my={2}>
              <Box sx={{ flexGrow: 1 }} />
              <Button color="info" sx={{textTransform:"none",fontWeight:"600"}} href="/auth/login">Alredy have account?</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
}

export default SignInForm;
