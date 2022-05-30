import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Confirmation(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
      >
        <DialogTitle>{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you Want to Delete</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleYes}>Yes</Button>
          <Button onClick={props.handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Confirmation;
