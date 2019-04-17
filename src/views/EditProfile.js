import React, { Component } from "react";
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


const usernameFromLocalStorage = "username";

export class EditProfile extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser(usernameFromLocalStorage);
  }
  handleChange = e => {
    this.props.onInputChange({ field: e.target.name, value: e.target.value });
  };
  handleImageChange = e => {
    this.props.uploadImage(e.target.files[0]).then(() => {
      const { loggedInUser } = this.props;
      this.props.saveUpdatedUser(
        fieldRemover(loggedInUser),
        usernameFromLocalStorage
      );
    });
  };
  handleSubmit = e => {
    const { loggedInUser } = this.props;
    this.props.saveUpdatedUser(
      fieldRemover(loggedInUser),
      usernameFromLocalStorage
    );
  };

  render() {
    const { error, message } = this.props;
    const {
      username,
      email,
      firstName,
      lastName,
      bio,
      phone,
      address,
      image
    } = this.props.loggedInUser;
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
              />
              <Confirm onClick={this.handleSubmit} title="Save" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export const mapStateToProps = state => ({
  loggedInUser: state.user.profile,
  loading: state.user.loading,
  error: state.user.error,
  message: state.user.message
});

export const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: username => dispatch(fetchCurrentUser(username)),
    onInputChange: payload => dispatch(handleFormInput(payload)),
    saveUpdatedUser: (data, username) =>
      dispatch(saveUpdatedUser(data, username)),
    uploadImage: file => dispatch(uploadImage(file))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
