import React from "react";
import PropTypes from "prop-types";
import BasicButton from "../Buttons/BasicButton";
import defaultAvatar from "../../../assets/img/user.png";

const AuthorCard = props => {
  const { following, username, image } = props;
  return (
    <div className="author">
      <div className="inline-author">
        <div className="user-profile-img">
          <img src={image || defaultAvatar} alt="author" />
        </div>
        <p className="username">@{username}</p>
      </div>
      <span />
      <p className="author-bio">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <BasicButton
        className={`following-btn ${following ? "btn-fill" : ""}`}
        title="Follow"
        onClick={() => null}
      />
    </div>
  );
};
AuthorCard.propTypes = {
  following: PropTypes.bool,
  image: PropTypes.string,
  username: PropTypes.string.isRequired
};
AuthorCard.defaultProps = {
  following: false,
  image: null
};
export default AuthorCard;
