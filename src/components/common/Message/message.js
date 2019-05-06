import React from "react";
import PropTypes from "prop-types";

const Message = ({ title, classType, icons }) => (
  <div className={classType}>
    <i className={icons} />
    {title}
  </div>
);

Message.propTypes = {
  title: PropTypes.string.isRequired,
  classType: PropTypes.string.isRequired,
  icons: PropTypes.string.isRequired
};

export default Message;
