import { Box, Typography } from "@mui/material";

function Heading(props) {
  return (
    <Box
      p={2}
      mb={4}
      sx={{
        bgcolor: "#FFFFFF",
        opacity: "48%",
        borderRadius: "4px",
        fontFamily: "arial",
        fontSize: "20px",
      }}
    >
      <Typography color="secondary" variant="h4">{props.heading}</Typography>
    </Box>
  );
}

export default Heading;
