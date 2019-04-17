import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fieldRemover } from "../helpers/helpers";
import Input from "../components/common/Inputs/input";
import Confirm from "../components/common/Buttons/confirm";
import {
  fetchCurrentUser,
  handleFormInput,
  saveUpdatedUser,
  uploadImage
} from "../redux/actions";
import ErrorMessage from "../components/common/Message/error";
import SuccessMessage from "../components/common/Message/success";

export class EditProfile extends Component {
  componentDidMount() {
    const { username } = this.props.match.params;
    const { onFetchCurrentUser } = this.props;
    onFetchCurrentUser(username);
  }

  handleChange = e => {
    const { onInputChange } = this.props;
    onInputChange({ field: e.target.name, value: e.target.value });
  };

  handleImageChange = e => {
    const { loggedInUser, onUploadImage, onSaveUpdatedUser } = this.props;
    onUploadImage(e.target.files[0]).then(() => {
      onSaveUpdatedUser(fieldRemover(loggedInUser));
    });
  };

  handleSubmit = () => {
    const { loggedInUser, onSaveUpdatedUser } = this.props;
    onSaveUpdatedUser(fieldRemover(loggedInUser));
  };

  render() {
    const {
      loggedInUser: {
        username,
        email,
        firstName,
        lastName,
        bio,
        phone,
        address,
        image
      },
      error,
      message
    } = this.props;
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   return <h1 style={{ marginTop: "100px" }}>Not Authorized</h1>;
    // }
    return (
      <div className="main update-profile-container">
        <div className="update">
          <div className="update-left">
            <div className="logo-container">
              <img
                src={require("../assets/img/main-logo.svg")}
                alt="logo"
                className="logo"
              />
              <h2>Author's Heaven</h2>
            </div>
            <div className="avatar-container">
              <img
                src={image}
                className="avatar"
                alt="profilePicture"
                name="image"
              />
              <input
                className="profile_picture"
                name="image"
                onChange={this.handleImageChange}
                type="file"
                alt="profilePicture"
                style={{ display: "block", cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="update-right">
            <div className="update-form">
              <p>Edit profile</p>
              <div>{error ? <ErrorMessage title={error} /> : ""}</div>
              <div>{message ? <SuccessMessage title={message} /> : ""}</div>
              <Input
                className="input_field"
                name="firstName"
                type="text"
                placeholder="First name"
                onChange={this.handleChange}
                value={firstName}
              />
              <Input
                name="lastName"
                type="text"
                placeholder="Last name"
                onChange={this.handleChange}
                value={lastName}
              />
              <textarea
                rows="7"
                cols="53"
                type="textarea"
                name="bio"
                placeholder="Bio"
                onChange={this.handleChange}
                value={bio}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={email}
                disabled
              />
              <Input
                name="phone"
                type="tel"
                placeholder="Phone"
                onChange={this.handleChange}
                value={phone}
              />
              <Input
                name="address"
                type="text"
                placeholder="City"
                onChange={this.handleChange}
                value={address}
              />
              <Input
                name="username"
                type="text"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                disabled
              />
              <Confirm onClick={this.handleSubmit} title="Save" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  loggedInUser: PropTypes.object,
  message: PropTypes.string,
  onFetchCurrentUser: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveUpdatedUser: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired
};
EditProfile.defaultProps = {
  error: "",
  loading: false,
  message: "",
  loggedInUser: {}
};
export const mapStateToProps = state => ({
  loggedInUser: state.user.profile,
  loading: state.user.loading,
  error: state.user.error,
  message: state.user.message
});

export const mapDispatchToProps = dispatch => ({
  onFetchCurrentUser: username => dispatch(fetchCurrentUser(username)),
  onInputChange: payload => dispatch(handleFormInput(payload)),
  onSaveUpdatedUser: data => dispatch(saveUpdatedUser(data)),
  onUploadImage: file => dispatch(uploadImage(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
