import { ClassNames } from "@emotion/react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  btn: {
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
    },
  },
});

function RMTbtn(props) {
  const classes = useStyle();
  return (
    <>
      <Button
        href={props.href}
        sx={{ bgcolor: "#1383DD", marginY: "1rem", color: "#fff" }}
        color="secondary"
        onClick={props.handler}
        className={classes.btn}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "open sans", fontWeight: "600" }}
        >
          {props.btn}
        </Typography>
      </Button>
    </>
  );
}

export default RMTbtn;
