/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import Button from "../common/Buttons/BasicButton";
import Input from "../common/Inputs/TextInput";

export const ReportingForm = props => {
  const { cancelReport, onInputChange, submitReport } = props;
  return (
    <div className="reporting__form__container">
      <div>
        <h3>Why are you reporting this article?</h3>
        <div className="report_input">
          <Input
            placeholder="Tell your reason"
            type="text"
            value="Tell your reason"
            name="description"
            onChange={onInputChange}
          />
        </div>
        <div className="submit_report">
          <Button
            title="Submit"
            className="btn report"
            onClick={submitReport}
          />
          <Button
            title="Cancel"
            className="btn report"
            onClick={cancelReport}
          />
        </div>
      </div>
    </div>
  );
};

ReportingForm.propTypes = {
  cancelReport: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  submitReport: PropTypes.func.isRequired
};
