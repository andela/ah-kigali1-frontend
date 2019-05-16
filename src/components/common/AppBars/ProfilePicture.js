import React from "react";
import PropTypes from "prop-types";
import defaultAvatar from "../../../assets/img/author.svg";

const ProfilePicture = ({ profile, onClick }) => {
  const { username, firstName, lastName, image } = profile;
  return (
    <button
      type="button"
      className="current-user hide-sm"
      onClick={onClick}
      id="user-dropdown"
      data-test="user-dropdown"
    >
      <img src={image || defaultAvatar} alt="user" className="user-avatar" />
      <div className="user-name">
        <p>{firstName && lastName ? `${firstName} ${lastName}` : username}</p>
      </div>
    </button>
  );
};
ProfilePicture.propTypes = {
  onClick: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired
};

export default ProfilePicture;
