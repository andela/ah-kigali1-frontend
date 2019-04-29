import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import Validator from "../utils/validator";
import { checkNextProps } from "../utils/helperFunctions";
import Input from "../components/common/Inputs/TextInput";
import Button from "../components/common/Buttons/BasicButton";
import Error from "../components/common/Message/error";
import Tag from "../components/common/Tags/NewTag";
import { toolbarConfig } from "../utils/editor/editorConfig";
import {
  editArticle,
  newArticle,
  fetchOneArticle
} from "../redux/actions/newArticle";

export const mapDispatchToProps = dispatch => ({
  fetchArticleToEdit: slug => dispatch(fetchOneArticle(slug)),
  createArticle: (article, history) => dispatch(newArticle(article, history)),
  editOneArticle: (article, slug, history) =>
    dispatch(editArticle(article, slug, history))
});

export const mapStateToProps = state => ({
  ...state.newArticle,
  ...state.auth
});

export class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      tag: "",
      title: "",
      isFetching: false,
      description: "",
      tagsList: [],
      error: "",
      value: RichTextEditor.createEmptyValue()
    };
  }

  componentDidMount = () => {
    const {
      match: {
        params: { slug }
      },
      fetchArticleToEdit,
      history: {
        location: { pathname }
      }
    } = this.props;
    if (pathname !== "/articles/new") {
      this.setState({ edit: true, isFetching: true });
      fetchArticleToEdit(slug);
    }
  };

  componentWillReceiveProps = nextProps => {
    const { articleError } = nextProps;
    if (articleError) {
      this.setState({ error: articleError });
      return setTimeout(() => this.setState({ error: "" }), 3000);
    }
    const { article } = this.props;

    if (checkNextProps(nextProps.article, article)) {
      this.setState({
        ...nextProps.article,
        isFetching: false,
        value: RichTextEditor.createValueFromString(
          nextProps.article.body,
          "html"
        )
      });
    }
  };

  onEditorChange = value => {
    this.setState({ value });
  };

  onRemoveTag = value => {
    const { tagsList } = this.state;
    const index = tagsList.indexOf(value);
    tagsList.splice(index, 1);
    this.setState({ tagsList });
  };

  cancelEdit = () => {
    const { history } = this.props;
    return history.push("/");
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitArticle = () => {
    const {
      editOneArticle,
      createArticle,
      history,
      history: {
        location: { pathname }
      },
      match: {
        params: { slug }
      }
    } = this.props;
    const { title, value, description } = this.state;

    const error = Validator.newArticleValidation({
      title,
      body: value.toString("html"),
      description
    });
    if (error) {
      this.setState({ error });
      return this.clearErrorMessage();
    }
    this.setState({
      error: ""
    });
    if (pathname !== "/articles/new") {
      return editOneArticle(
        {
          title,
          body: value.toString("html"),
          description
        },
        slug,
        history
      );
    }
    return createArticle(
      {
        title,
        body: value.toString("html"),
        description
      },
      history
    );
  };

  handleNewTag = event => {
    const { tag, tagsList } = this.state;
    if (event.keyCode === 13 && tag.length) {
      this.setState({ tag: "", tagsList: [...tagsList, tag] });
    }
  };

  clearErrorMessage = () =>
    setTimeout(() => this.setState({ error: "" }), 3000);

  displayErrorMessage = () => {
    const { error } = this.state;
    return (
      <div className="error error__message">
        {error.length ? <Error title={error} /> : ""}
      </div>
    );
  };

  render() {
    const {
      value,
      edit,
      tag,
      title,
      body,
      description,
      tagsList,
      isFetching
    } = this.state;

    const { isSubmitting } = this.props;
    return isFetching ? (
      ""
    ) : (
      <div>
        {this.displayErrorMessage()}
        <div className="new-article-container container">
          <div className="buttons">
            {edit ? (
              <Button
                className="button--dark cancel"
                title="Cancel"
                disabled={isSubmitting}
                onClick={this.cancelEdit}
              />
            ) : (
              ""
            )}
            <Button
              className="button--dark publish"
              title={edit ? "Save" : "Publish"}
              disabled={isSubmitting}
              onClick={this.submitArticle}
            />
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
                onKeyDown={e => this.handleNewTag(e)}
                onChange={e => this.handleInputChange(e)}
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

Article.propTypes = {
  editOneArticle: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  fetchArticleToEdit: PropTypes.func.isRequired,
  articleError: PropTypes.shape({}).isRequired,
  isSubmitting: PropTypes.bool,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    message: PropTypes.string,
    response: PropTypes.object,
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

Article.defaultProps = {
  isSubmitting: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
