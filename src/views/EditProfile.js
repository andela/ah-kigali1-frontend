/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React, { Component } from "react";

class Profile extends Component {
  render() {
    return (
      <div class="main update-profile-container">
      <div class="update">
        <div class="update-left">
          <div class="logo-container">
            <img src={require("../assets/img/main-logo.svg")} alt="logo" class="logo" />
            <h2>Author's Heaven</h2>
          </div>
          <div class="avatar-container">
            <img
              src={require("../assets/img/profile-picture.jpg")}
              class="avatar"
              style="cursor: pointer;"
            />
            <input
              type="file"
              alt="profilePicture"
              style="display:block; cursor: pointer;"
            />
          </div>
        </div>

        <div class="update-right">
          <div class="update-form">
            <p>Edit profile</p>
            <form>
              <input type="text" id="update-name" placeholder="First name" />
              <input type="text" id="update-surname" placeholder="Last name" />
              <input type="text" name="bio" id="update-bio" placeholder="Bio" />
              <input type="email" id="update-email" placeholder="Email" />
              <input type="tel" id="update-phone" placeholder="Phone" />
              <input type="text" id="update-city" placeholder="City" />
              <input type="text" id="update-username" placeholder="Username" />
            </form>
            <button type="submit" class="button">
              save
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Profile;
