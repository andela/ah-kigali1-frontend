import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveHighlight } from "../../redux/actions/highlightCommentActions";
import Button from "../common/Buttons/FormButton";

export class CommentModel extends Component {
  state = {
    comment: ""
  };

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;
    if (!isOpen) {
      this.closeModel();
    }
  }

  closeModel = () => {
    this.setState({
      comment: ""
    });
  };

  saveComment = () => {
    const { start, end, saveHighlight: save, slug, onClose } = this.props;
    const { comment } = this.state;
    save({ startIndex: start, endIndex: end, comment, slug });
    onClose();
  };

  render() {
    const { isOpen, onClose, id } = this.props;
    const { comment } = this.state;
    return (
      <div id={id} className={`comment-modal ${isOpen && "active"}`}>
        <div className="modal-content">
          <button
            type="button"
            className="close"
            onClick={onClose}
            onKeyDown={onClose}
            data-test="close-btn"
          >
            &times;
          </button>
          <textarea
            className="comment-input"
            type="textarea"
            rows="5"
            spellCheck="true"
            value={comment}
            onChange={e => this.setState({ comment: e.target.value })}
            data-test="comment-model-input"
          />
          <Button value="Submit" onClick={this.saveComment} />
        </div>
      </div>
    );
  }
}

CommentModel.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string,
  start: PropTypes.number,
  end: PropTypes.number,
  saveHighlight: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired
};

CommentModel.defaultProps = {
  isOpen: false,
  id: "comment-model",
  start: 0,
  end: 0
};

const mapStateToProps = state => ({ ...state.highlights });

export default connect(
  mapStateToProps,
  { saveHighlight }
)(CommentModel);
