//mui
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { timeParser, dateParser } from "../../Utils/TimeFormatter";

const useStyle = makeStyles({
  message: {
    fontFamily: "Amaranth",
    color: "#E28743",
    fontSize: "16px",
  },
  date: {
    fontFamily: "Calibri",
    color: "#A19F9E",
    fontSize: "11px",
  },
  author: {
    fontFamily: "Arial",
    color: "#DFDADA",
    fontSize: "13px",
  },
});

function LeftMessage(props) {
  const classes = useStyle();
  return (
    <Box>
      <Box
        maxWidth={600}
        minWidth={300}
        m={1.5}
        sx={{
          direction: "ltr",
          boxShadow: "0px 1px 3px 0px #05243C",
          float: "left",
          backgroundColor: "#073A63",
          borderRadius: "0 20px 20px 20px",
        }}
        p={1}
        pl={3}
      >
        <Typography className={classes.author} variant="subtitle1">
          {props.data.sender.name}
        </Typography>
        <Typography className={classes.message} sx={{ wordBreak: "break-all" }}>
          {props.data.message}
        </Typography>
        <Typography className={classes.date} variant="subtitle2">
          {dateParser(props.data.updatedAt) +
            " - " +
            timeParser(props.data.updatedAt)}
        </Typography>
      </Box>
    </Box>
  );
}

export default LeftMessage;
