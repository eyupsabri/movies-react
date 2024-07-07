import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { dissmissAlert } from "../../state/alertSlice/alertSlice";

export default function AlertDialog() {
  const alert = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(dissmissAlert());
  };

  React.useEffect(() => {
    if (alert.showAlert && alert.type === "default") {
      setTimeout(() => {
        dispatch(dissmissAlert());
      }, 3000);
    }
  }, [alert.showAlert, dispatch]);

  return (
    <React.Fragment>
      {alert.type === "button" ? (
        <Dialog
          open={alert.showAlert}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{alert.message}</DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alert.message}
            </DialogContentText>
          </DialogContent> */}
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={alert.showAlert}
          onClose={() => {}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{alert.message}</DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alert.message}
            </DialogContentText>
          </DialogContent> */}
        </Dialog>
      )}
    </React.Fragment>
  );
}
