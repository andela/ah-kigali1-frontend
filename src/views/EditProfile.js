/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fieldRemover } from "../helpers/helpers";
import Input from "../components/common/Inputs/input";
import BasicButton from "../components/common/Buttons/BasicButton";
import Message from "../components/common/Message/message";
import forbidden from "../assets/img/403.png";
import mainLogo from "../assets/img/main-logo.svg";
import defaultImage from "../assets/img/defaultImage.png";
import {
  fetchCurrentUser,
  handleFormInput,
  saveUpdatedUser,
  uploadImage
} from "../redux/actions/profileActions";

export class EditProfile extends Component {
  componentDidMount() {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { onFetchProfile } = this.props;
    onFetchProfile(username);
  }

  handleChange = ({ target: { name, value } }) => {
    const { onInputChange } = this.props;
    onInputChange({ field: name, value });
  };

  handleImageChange = ({ target }) => {
    const { profile, onUploadImage, onSaveUpdatedUser } = this.props;
    onUploadImage(target.files[0]).then(response => {
      onSaveUpdatedUser(
        fieldRemover({ ...profile, image: response.secure_url })
      );
    });
  };

  handleSubmit = () => {
    const { profile, onSaveUpdatedUser } = this.props;
    onSaveUpdatedUser(fieldRemover(profile));
  };

  render() {
    const {
      profile: { email, firstName, lastName, bio, phone, address, image },
      error,
      message,
      loading,
      loggedInUser
    } = this.props;
    const {
      match: {
        params: { username }
      }
    } = this.props;
    if (loggedInUser) {
      if (loggedInUser.username !== username || !loggedInUser) {
        return <img className="loading" src={forbidden} alt="Forbidden" />;
      }
    }
    return (
      <div>
        <div className="main update-profile-container">
          <div className="update">
            <div className="update-left">
              <div className="logo-container">
                <img src={mainLogo} alt="logo" className="logo" />
                <h2>Authors Heaven</h2>
              </div>

              <div className="avatar-container">
                <div className="avatar-upload">
                  <div className="avatar-edit">
                    <input
                      type="file"
                      id="imageUpload"
                      className="profile_picture"
                      accept=".png, .jpg, .jpeg"
                      onChange={this.handleImageChange}
                    />
                    <label htmlFor="imageUpload" />
                  </div>
                  <div className="avatar-preview">
                    <img
                      id="imagePreview"
                      alt="pro pics"
                      src={image || defaultImage}
                    />
                  </div>
                </div>
              </div>
              {loading ? (
                <Message
                  title="uploading..."
                  classType="info-msg"
                  icons="fa fa-info-circle"
                />
              ) : (
                ""
              )}
            </div>
            <div className="update-right">
              <div className="update-form">
                <p>Edit profile</p>
                <div className="msg">
                  {error ? (
                    <Message
                      title={error}
                      classType="error-msg"
                      icons="fa fa-times-circle"
                    />
                  ) : (
                    ""
                  )}
                  {message ? (
                    <Message
                      title={message}
                      classType="success-msg"
                      icons="fa fa-check"
                    />
                  ) : (
                    ""
                  )}
                </div>

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
                <BasicButton onClick={this.handleSubmit} title="Save" />
              </div>
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
  profile: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  message: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
    match: PropTypes.object
  }),
  onFetchProfile: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveUpdatedUser: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired,
  loggedInUser: PropTypes.shape({}).isRequired
};
EditProfile.defaultProps = {
  error: "",
  loading: false,
  message: "",
  history: {}
};
export const mapStateToProps = ({ user, auth }) => ({
  profile: user.profile,
  loading: user.loading,
  error: user.error,
  message: user.message,
  loggedInUser: auth.currentUser
});

export const mapDispatchToProps = dispatch => ({
  onFetchProfile: username => dispatch(fetchCurrentUser(username)),
  onInputChange: payload => dispatch(handleFormInput(payload)),
  onSaveUpdatedUser: data => dispatch(saveUpdatedUser(data)),
  onUploadImage: file => dispatch(uploadImage(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
