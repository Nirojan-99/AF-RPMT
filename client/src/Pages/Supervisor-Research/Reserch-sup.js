import { Box, Container, Paper } from "@mui/material";
import Header from "../../Components/Header";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Groups from "./Groups";
import Requests from "./Requests";

function ResearchSup(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <>
      <Header handler={props.handler} />
      <Box component={Paper} square elevation={0} minHeight="82vh">
        <Container maxWidth="sm" sx={{ bgcolor: "#1071bc" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="#fff"
            indicatorColor="primary"
            variant="scrollable"
            sx={{ color: "#073050" }}
          >
            <Tab label="Your Groups" />
            <Tab label="Grouping Requests" />
          </Tabs>
        </Container>
        <Container sx={{ mt: 3 }} maxWidth="md">
          <SwipeableViews
            axis={"x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Groups />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Requests />
            </TabPanel>
          </SwipeableViews>
        </Container>
      </Box>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default ResearchSup;
