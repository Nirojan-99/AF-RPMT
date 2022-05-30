import { Paper, Box, Container, Button, Typography } from "@mui/material";
import Header from "../../Components/Header";
import PublishIcon from "@mui/icons-material/Publish";

//react
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Alert from "../../Components/Alert";

function TopicDoc(props) {
  //sub id
  const { id } = useParams();

  //error state
  const [error, setError] = useState();

  //user data
  const { token, userID, role, URL } = useSelector((state) => state.loging);

  //state
  const [selectedFile, setFile] = useState("");

  //submit
  const submit = () => {
    if (!selectedFile) {
      return setError("Select a file to submit");
    }

    const data = new FormData();

    data.append("doc", selectedFile);
    data.append("submitted_by", userID);

    axios
      .post(`${URL}groups/topics/${id}`, data, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        toast("file successfully submitted", { type: "success" });
      })
      .catch((er) => {
        toast("unable to submit file,try again", { type: "error" });
      });
  };

  return (
    <>
      <Alert
        open={!!error}
        msg={error}
        title="Alert!"
        handleClose={() => {
          setError("");
        }}
      />
      <ToastContainer />
      <Header handler={props.handler} />
      <Box component={Paper} elevation={0} square minHeight={"79vh"} py={2}>
        <Container maxWidth="sm">
          <Box component={Paper} elevation={2} p={2}>
            <input
              type="file"
              id="doc"
              hidden
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            />
            <label htmlFor="doc">
              <PublishIcon
                sx={{
                  cursor: "pointer",
                  borderRadius: 1,
                  bgcolor: "#888",
                  width: "100%",
                  height: 200,
                  transitionProperty: "all",
                  transitionDuration: ".5s",
                  "&:hover": {
                    transform: "scale(1.01)",
                  },
                }}
              />
            </label>
            {selectedFile && (
              <Typography sx={{ fontSize: 12, color: "#999" }}>
                Selected File : {selectedFile.name}
              </Typography>
            )}
            <Button
              onClick={submit}
              sx={{ mt: 2, textAlign: "center", width: "100%" }}
              color="info"
              variant="outlined"
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default TopicDoc;
