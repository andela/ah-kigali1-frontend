/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";

export const MoreReactions = props => {
  const { displayReportArticleForm } = props;
  return (
    <div className="popup__report">
      <div>
        <p onClick={displayReportArticleForm}>Report </p>
        <hr />
        <p>Rate</p>
        <hr />
      </div>
    </div>
  );
};

MoreReactions.propTypes = {
  displayReportArticleForm: PropTypes.func.isRequired
};
