/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Button from "../common/Buttons/BasicButton";
import Validator from "../../utils/validator";
import { displayReportResponse } from "../../utils/helperFunctions";

export class ReportingForm extends Component {
  state = {
    reportDescription: ""
  };

  onFormInputChange = event => {
    const { value } = event.target;
    this.setState({ reportDescription: value });
  };

  onSubmitReport = () => {
    const { reportDescription: description } = this.state;
    const { reportArticle, slug } = this.props;
    const error = Validator.reportDescription(description);
    if (error) {
      return this.handleRemovingErrorMessage("reportError", error);
    }
    this.setState({ isSubmitting: true });
    reportArticle(slug, description).then(response => {
      if (response.status === 200) {
        return this.handleRemovingErrorMessage(
          "reportSuccess",
          response.message,
          "cancel report"
        );
      }
      return this.handleRemovingErrorMessage(
        "reportError",
        response.message,
        "cancel report"
      );
    });
  };

  handleRemovingErrorMessage = (field, value, cancelReportForm = false) => {
    const { cancelReport } = this.props;
    this.setState({ [field]: value, isSubmitting: false });
    return setTimeout(() => {
      if (cancelReportForm) {
        cancelReport();
      }
      this.setState({ [field]: "" });
    }, 3000);
  };

  render() {
    const { cancelReport } = this.props;
    const {
      reportError,
      reportSuccess,
      reportDescription: value,
      isSubmitting
    } = this.state;

    const token = localStorage.getItem("token");

    if (!token) {
      return <Redirect to="/sign_in" />;
    }
    return (
      <div className="reporting__form__container">
        <div className="report_error">
          {displayReportResponse(reportError, reportSuccess)}
        </div>
        <div className="report_article">
          <h3>Why are you reporting this article?</h3>
          <div className="report_input">
            <textarea
              className="report_text_area"
              placeholder="Tell your reason"
              type="text"
              value={value}
              name="description"
              onChange={e => this.onFormInputChange(e)}
            />
          </div>
          <div className="submit_report">
            <Button
              title="Submit"
              disabled={isSubmitting}
              className="btn report"
              onClick={this.onSubmitReport}
            />
            <Button
              title="Cancel"
              disabled={isSubmitting}
              className="btn report"
              onClick={cancelReport}
            />
          </div>
        </div>
      </div>
    );
  }
}
ReportingForm.propTypes = {
  cancelReport: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  reportArticle: PropTypes.func.isRequired
};
