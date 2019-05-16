/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import BasicButton from "../Buttons/BasicButton";

class DeleteDialogue extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = del => {
    this.setState({ open: false });
    const { deleteComment } = this.props;
    if (del) deleteComment();
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <div className="delete-comment" onClick={this.handleClickOpen}>
          <i className="fa fa-trash" />
        </div>
        <Dialog
          open={open}
          onClose={() => this.handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete My comment?"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your comment?.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <BasicButton
              title="Cancel"
              onClick={() => this.handleClose(false)}
            />
            <BasicButton
              id="delete-profile"
              title="Delete my comment"
              onClick={() => this.handleClose(true)}
              style={{ color: "red", fontWeight: "bold" }}
              autoFocus
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
DeleteDialogue.propTypes = {
  deleteComment: PropTypes.func.isRequired
};
export default DeleteDialogue;
