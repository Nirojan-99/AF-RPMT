import image from "../../../Assets/login_img1.jpg";

//mui
import { Card, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const useStyle = makeStyles({
  heading: {
    fontFamily: "Amaranth",
  },
  sub: {
    fontFamily: "Arial",
    fontWeight: "600",
  },
});

function SideImage(props) {
  const classes = useStyle();

  return (
    <Card raised>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <CardMedia
          style={{ height: props.heights, paddingTop: "0" }}
          component="img"
          image={image}
        />
        <div
          style={{
            position: "absolute",
            top: "3rem",
            width: "100%",
            textAlign: "center",
            margin: "auto",
            height: "50%",
          }}
        >
          {" "}
          <Typography className={classes.heading} variant="h4">
            {props.heading}
          </Typography>
          <Typography className={classes.sub} variant="subtitle1">
            {props.subheading}
          </Typography>
        </div>
        <div
          style={{
            position: "absolute",
            color: "white",
            top: "92%",
            width: "100%",
            textAlign: "center",
            margin: "auto",
            height: "50%",
          }}
        >
          <Button href="/auth/login" color="secondary" variant="contained">
            SIGN IN
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default SideImage;
