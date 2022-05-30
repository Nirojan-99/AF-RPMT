import { Box, Typography } from "@mui/material";

function Heading(props) {
  return (
    <Box
      p={1}
      mb={4}
      sx={{
        bgcolor: "#FFFFFF",
        opacity: "48%",
        borderRadius: "4px",
      }}
    >
      <Typography color="secondary" sx={{ fontFamily: "arial", fontSize: 19,fontWeight:"700" }}>
        {props.heading}
      </Typography>
    </Box>
  );
}

export default Heading;
