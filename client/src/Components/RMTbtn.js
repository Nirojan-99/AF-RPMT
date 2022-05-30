import { Button, Typography } from "@mui/material";
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
        disabled={props.disabled}
        href={props.href}
        sx={{
          bgcolor: "#1383DD",
          marginY: "1rem",
          color: "#fff",
        }}
        color="secondary"
        onClick={props.handler}
        className={classes.btn}
      >
        <Typography
          sx={{
            fontFamily: "open sans",
            fontWeight: "500",
            fontSize: 13,
            textTransform: "none",
          }}
        >
          {props.btn}
        </Typography>
      </Button>
    </>
  );
}

export default RMTbtn;
