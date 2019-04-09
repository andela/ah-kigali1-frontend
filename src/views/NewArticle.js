import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import Validator from "../utils/validator";
import Input from "../components/common/Inputs/TextInput";
import Button from "../components/common/Buttons/BasicButton";
import Success from "../components/common/Message/success";
import Error from "../components/common/Message/error";
import Tag from "../components/common/Tags/NewTag";
import { toolbarConfig } from "../utils/editor/editorConfig";
import {
  handleInputField,
  newArticle,
  handleCreateTag,
  removeTag
} from "../redux/actions/newArticle";

export const mapDispatchToProps = dispatch => ({
  onInputChange: field => dispatch(handleInputField(field)),
  newTag: tag => dispatch(handleCreateTag(tag)),
  createArticle: article => dispatch(newArticle(article)),
  handleRemoveTag: tag => dispatch(removeTag(tag))
});

const mapStateToProps = state => ({
  response: state.article.response,
  article: state.article
});

export class CreateArticle extends Component {
  constructor() {
    super();
    this.state = {
      tag: "",
      error: "",
      value: RichTextEditor.createEmptyValue()
    };
  }

  onEditorChange = value => {
    this.setState({ value });
    const { onInputChange } = this.props;
    onInputChange({ name: "body", value: value.toString("html") });
  };

  onTagInputChange = event => {
    this.setState({
      tag: event.target.value
    });
  };

  onRemoveTag = value => {
    const { handleRemoveTag } = this.props;
    handleRemoveTag(value);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    const { onInputChange } = this.props;
    onInputChange({ name, value });
  };

  submitArticle = () => {
    const { article, createArticle } = this.props;
    const { title, body, description, tagsList } = article;

    const error = Validator.newArticleValidation(article);
    if (error && error.length) {
      return this.setState({ error });
    }
    this.setState({
      error: ""
    });
    createArticle({ title, body, description, tagsList });
  };

  handleNewTag = event => {
    const { tag } = this.state;
    if (event.keyCode === 13 && tag.length) {
      const { newTag } = this.props;
      newTag({ tag });
      this.setState({ tag: "" });
    }
  };

  render() {
    const { error, value, tag } = this.state;
    const { isSubmitting, response, article } = this.props;
    const { title, description, tagsList } = article;

    return (
      <div className="new-article-container container">
        <div className="buttons">
          <Button
            className="button--dark publish"
            title="Publish"
            disabled={isSubmitting}
            onClick={e => this.submitArticle(e)}
          />
        </div>
        <div className="error">
          {error.length ? <Error title={error} /> : false}
        </div>
        <div className="success message">
          {response ? <Success title={response.message} /> : false}
        </div>
        <div className="main-article">
          <div className="title">
            <Input
              className="title__input"
              type="text"
              value={title}
              placeholder="The title should come here"
              name="title"
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <hr className="line__title" />
          <div className="description">
            <Input
              className="description__input"
              type="text"
              value={description}
              placeholder="Description should be here"
              name="description"
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <hr className="line__title" />
          <div className="tags">
            {tagsList.map(newTag => (
              <Tag
                title={newTag}
                key={newTag}
                onClick={() => this.onRemoveTag(newTag)}
              />
            ))}
            <Input
              type="text"
              id="new-tag"
              placeholder="new tag"
              name="tag"
              className="tag"
              value={tag}
              onKeyUp={e => this.handleNewTag(e)}
              onChange={e => this.onTagInputChange(e)}
            />
          </div>
          <RichTextEditor
            editorClassName="demo_editor"
            placeholder="Tell a story"
            value={value}
            onChange={e => this.onEditorChange(e)}
            toolbarConfig={toolbarConfig}
          />
        </div>
      </div>
    );
  }
}

CreateArticle.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  newTag: PropTypes.func.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  response: PropTypes.string,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    description: PropTypes.string,
    tagsList: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};
CreateArticle.defaultProps = {
  isSubmitting: false,
  response: ""
};
const NewArticle = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateArticle);

export default NewArticle;
