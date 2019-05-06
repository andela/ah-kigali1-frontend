/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import BasicButton from "../Buttons/BasicButton";

export class AlertDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = del => {
    this.setState({ open: false });
    const { deleteProfile } = this.props;
    if (del) deleteProfile();
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Link onClick={this.handleClickOpen} className="danger">
          Delete
        </Link>
        <Dialog
          open={open}
          onClose={() => this.handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Author's Heaven Account?"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We will delete all of your articles Authors heaven platform. Click
              Cancel to quit without deleting.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <BasicButton
              title="Cancel"
              onClick={() => this.handleClose(false)}
            />
            <BasicButton
              className="btn delete-profile"
              title="Delete my account"
              onClick={() => this.handleClose(true)}
              autoFocus
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
AlertDialog.propTypes = {
  deleteProfile: PropTypes.func.isRequired
};

export default AlertDialog;
