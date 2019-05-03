/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React, { Component } from "react";
import Textarea from "react-textarea-autosize";
import PropTypes from "prop-types";
import moment from "moment";
import authorImage from "../assets/img/user.jpg";
import Button from "../components/common/Buttons/BasicButton";
import DeleteDialogue from "../components/common/Dialog/DeleteDialogue";
import heartIcon from "../assets/img/heart.svg";

export class Comments extends Component {
  state = {
    editMode: false,
    index: null
  };

  onEnterPress = (e, id) => {
    const { editComment } = this.props;
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      editComment(id);
      this.setState({ editMode: false });
    }
  };

  isEditing = (body, index) => {
    const { onSetBodyEdit } = this.props;
    this.setState({ editMode: true, index });
    onSetBodyEdit({ value: body });
  };

  handleComment = id => {
    const { editComment } = this.props;
    editComment(id);
    this.setState({ editMode: false });
  };

  render() {
    const { editMode, index: commentIndex } = this.state;
    const {
      comments,
      updatedBody,
      deleteComment,
      handleCommentsInputEdit
    } = this.props;

    return Object.values(comments).length
      ? Object.values(comments).map((comment, index) => {
          const { body, like, id, createdAt, author } = comment;
          const { image, lastName, firstName, username } = author;
          return (
            <div className="article-comments--existing__desktop" key={id}>
              <div className="avatar-wrapper comment-avatar-wrapper">
                <img
                  src={image || authorImage}
                  alt="Avatar"
                  className="avatar"
                />
                <span className="comment-author_name ">
                  {username && firstName && lastName
                    ? `${firstName} ${lastName.charAt(0) ||
                        username.charAt(0)}.`
                    : username}
                </span>
              </div>
              <div className="article-comments--existing-text">
                {editMode && Number(commentIndex) === index ? (
                  <div>
                    <Textarea
                      id="edit-comment-textarea"
                      type="textarea"
                      onChange={handleCommentsInputEdit}
                      onKeyDown={e => this.onEnterPress(e, id)}
                      name="bodyEdit"
                      value={updatedBody}
                    />
                    <Button
                      id="update-comment"
                      className="btn delete_article"
                      onClick={() => this.handleComment(id)}
                      title="Update"
                    />
                    <Button
                      id="close-update-comment"
                      className="btn delete_article"
                      onClick={() => this.setState({ editMode: false })}
                      title="Cancel"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="time-ago">
                      Posted {moment(createdAt).fromNow()}
                    </div>
                    <div className="comment-body" key={id}>
                      {body}
                    </div>
                    <div className="comment-edit-delete">
                      <DeleteDialogue
                        id="delete-comment"
                        deleteComment={() => deleteComment(id)}
                      />
                      <div
                        className="edit-comment"
                        onClick={() => this.isEditing(body, index)}
                      >
                        <i className="fa fa-edit" />
                      </div>
                    </div>
                    <div className="article-comments--actions">
                      <span className="comment-like">
                        <div className="icons">
                          <img src={heartIcon} alt="likes" className="likes" />
                          <div>{like}</div>
                        </div>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })
      : "";
  }
}

Comments.propTypes = {
  comments: PropTypes.shape([]).isRequired,
  updatedBody: PropTypes.string.isRequired,
  onSetBodyEdit: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  handleCommentsInputEdit: PropTypes.func.isRequired
};

export default Comments;
