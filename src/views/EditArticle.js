import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import Navbar from "../components/common/AppBars/Navbar";
import Validator from "../utils/validator";
import Input from "../components/common/Inputs/TextInput";
import Button from "../components/common/Buttons/BasicButton";
import Success from "../components/common/Message/success";
import Error from "../components/common/Message/error";
import Tag from "../components/common/Tags/NewTag";
import { toolbarConfig } from "../utils/editor/editorConfig";
import {
  handleInputField,
  editArticle,
  handleCreateTag,
  fetchOneArticle,
  removeTag
} from "../redux/actions/newArticle";

export const mapDispatchToProps = dispatch => ({
  onInputChange: field => dispatch(handleInputField(field)),
  fetchArticleToEdit: slug => dispatch(fetchOneArticle(slug)),
  newTag: tag => dispatch(handleCreateTag(tag)),
  editOneArticle: (article, slug) => dispatch(editArticle(article, slug)),
  handleRemoveTag: tag => dispatch(removeTag(tag))
});

export const mapStateToProps = (state, ownProps) => ({
  response: state.article.response,
  article: state.article,
  ...ownProps
});

export class EditArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: "",
      title: props.article.title,
      isFetching: false,
      description: props.article.description,
      tagsList: props.article.tagsList,
      error: "",
      value: RichTextEditor.createValueFromString(props.article.body, "html")
    };
  }

  componentDidMount = () => {
    const { match, fetchArticleToEdit } = this.props;
    const { slug } = match.params;
    fetchArticleToEdit(slug);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.article.article_error) {
      const { history } = this.props;
      this.setState({ error: nextProps.article.article_error });
      return history.push("/not_found");
    }
    const { article } = this.props;
    const { title, description, tagsList, body } = article;
    if (
      nextProps.article.title !== title ||
      nextProps.article.description !== description ||
      nextProps.article.tagsList !== tagsList ||
      nextProps.article.body !== body
    ) {
      this.setState({
        title: nextProps.article.title,
        tagsList: nextProps.article.tagsList,
        isFetching: false,
        description: nextProps.article.description,
        value: RichTextEditor.createValueFromString(
          nextProps.article.body,
          "html"
        )
      });
    }
  };

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

  cancelEdit = () => {
    const { history } = this.props;
    return history.push("/");
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    const { onInputChange } = this.props;
    this.setState({ [name]: value });
    onInputChange({ name, value });
  };

  submitArticle = () => {
    const { article, editOneArticle, match } = this.props;
    const { title, body, description, tagsList } = article;
    const { slug } = match.params;
    const error = Validator.newArticleValidation(article);
    if (error && error.length) {
      return this.setState({ error });
    }
    this.setState({
      error: ""
    });
    editOneArticle({ title, body, description, tagsList }, slug);
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
    const {
      error,
      value,
      tag,
      title,
      body,
      description,
      tagsList,
      isFetching
    } = this.state;
    const { isSubmitting, response } = this.props;
    return isFetching ? (
      false
    ) : (
      <div>
        <Navbar />

        <div className="new-article-container container">
          <div className="buttons">
            <Button
              className="button--dark cancel"
              title="Cancel"
              disabled={isSubmitting}
              onClick={() => this.cancelEdit()}
            />
            <Button
              className="button--dark publish"
              title="Save"
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
              placeholder={body}
              value={value}
              onChange={e => this.onEditorChange(e)}
              toolbarConfig={toolbarConfig}
            />
          </div>
        </div>
      </div>
    );
  }
}

EditArticle.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  editOneArticle: PropTypes.func.isRequired,
  newTag: PropTypes.func.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
  fetchArticleToEdit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  response: PropTypes.string,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    article_error: PropTypes.string,
    description: PropTypes.string,
    tagsList: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

EditArticle.defaultProps = {
  isSubmitting: false,
  response: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArticle);
