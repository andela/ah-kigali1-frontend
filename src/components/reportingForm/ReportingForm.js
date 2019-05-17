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
      <div id="report-form" className={`comment-modal ${true && "active"}`}>
        <div className="notification">
          {displayReportResponse(reportError, reportSuccess)}
        </div>
        <div className="modal-content">
          <div className="form-header">
            <h3>Why are you reporting this article?</h3>
            <button
              type="button"
              className="close report"
              onClick={cancelReport}
              data-test="button"
            >
              &times;
            </button>
          </div>
          <textarea
            className="comment-input"
            type="textarea"
            rows="5"
            spellCheck="true"
            data-test="comment-model-input"
            placeholder="Tell your reason"
            value={value}
            name="description"
            onChange={e => this.onFormInputChange(e)}
          />
          <Button
            title="Submit"
            disabled={isSubmitting}
            onClick={this.onSubmitReport}
            value="Submit"
            className="btn report"
            data-test="button"
          />
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
