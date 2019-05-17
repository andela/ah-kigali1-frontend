import React from "react";
import PropTypes from "prop-types";
import CommentIcon from "../../assets/icons/comment-icon-white.svg";
import HighlighIcon from "../../assets/icons/highlighter.svg";

const HighlighPopover = ({ top, left, onClick, onHighlight }) => (
  <div
    className={`highlightMenu ${top && left ? "active" : ""}`}
    style={{ left: `${left}px`, top: `${top}px` }}
  >
    <div className="highlightMenu-inner">
      <button
        type="button"
        className="button-set"
        data-test="button-set"
        onClick={onHighlight}
      >
        <img src={HighlighIcon} alt="i" />
      </button>
      <button
        type="button"
        className="button-set"
        data-test="button-set"
        onClick={onClick}
      >
        <img src={CommentIcon} alt="icon" />
      </button>
    </div>
    <div className="highlightMenu-arrowClip">
      <span className="highlightMenu-arrow" />
    </div>
    <div className="arrow-wrapper">
      <span className="arrow" />
    </div>
  </div>
);

HighlighPopover.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onHighlight: PropTypes.func.isRequired
};

HighlighPopover.defaultProps = {
  top: 0,
  left: 0
};

export default HighlighPopover;
