import { Avatar, Box, Button, Grid, Modal } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { grey, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//react
import { useSelector } from "react-redux";

//css
const style = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#073050",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

function ImageModal(props) {
  //data
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  //user data
  const { URL } = useSelector((state) => state.loging);

  //handler
  const handleFile = (file) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  //drag and drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  };

  const handleOnChange = (event) => {
    let imageFile = event.target.files[0];
    handleFile(imageFile);
  };

  //upload dp
  const uploadImage = () => {
    const data = new FormData();

    data.append("dp", image);
    data.append("id", props.userID);

    axios
      .put(`${URL}users/dp/${props.userID}`, data, {
        headers: { Authorization: "Agriuservalidation " + props.token },
      })
      .then((res) => {
        toast("DP uploaded", { type: "success" });
      })
      .catch((er) => {
        toast("unable to uploade dp , try again", { type: "error" });
      });
  };
  //delete dp
  const removeImage = () => {
    axios
      .delete(`${URL}users/dp/${props.userID}`, {
        headers: { Authorization: "Agriuservalidation " + props.token },
      })
      .then((res) => {
        setPreviewUrl("");
        toast("DP removed", { type: "info" });
      })
      .catch((er) => {});
  };
  //useEffect hook
  useEffect(() => {
    axios
      .get(`${URL}users/dp/${props.userID}`, {
        headers: { Authorization: "Agriuservalidation " + props.token },
      })
      .then((res) => {
        setPreviewUrl(res.data.dp);
      })
      .catch((er) => {
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          <Box sx={{ textAlign: "center" }} width="100%">
            <label
              style={{ width: "100%", bgcolor: "red" }}
              htmlFor="image-dp"
              onDragOver={handleDragOver}
              onDrop={handleOnDrop}
              onChange={handleOnDrop}
            >
              <Avatar
                src={previewUrl && previewUrl}
                variant="square"
                sx={{
                  borderRadius: "4px",
                  bgcolor: grey[500],
                  color: "#333",
                  width: 330,
                  minHeight: 330,
                  maxHeight: 450,
                  height: "auto",
                  cursor: "pointer",
                }}
              >
                {!previewUrl && (
                  <CloudUploadIcon
                    sx={{
                      color: "#333",
                      width: 300,
                      height: 300,
                    }}
                  />
                )}
              </Avatar>
            </label>
            <br />
            <input
              hidden
              id="image-dp"
              type={"file"}
              onChange={handleOnChange}
            />
            <Grid
              container
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Grid item>
                <Button
                  onClick={uploadImage}
                  disableElevation
                  sx={{
                    bgcolor: "#064A82",
                    color: "#fff",
                    fontFamily: "open sans",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#3c52b2",
                    },
                  }}
                  variant="contained"
                  endIcon={<UploadIcon fontSize="small" />}
                >
                  Upload
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={removeImage}
                  disableElevation
                  sx={{
                    color: "#fff",
                    fontFamily: "open sans",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#3c52b2",
                    },
                  }}
                  color="error"
                  endIcon={<DeleteIcon fontSize="small" />}
                  variant="contained"
                >
                  Remove
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ color: red[500], fontFamily: "open sans" }}
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ImageModal;
