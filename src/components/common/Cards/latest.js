import React, { Component } from "react";

export default class Latest extends Component {
  render() {
    return (
      <div className="latest_article_content">
        <div
          className="pic"
          style={{
            backgroundImage: require("../../../assets/img/lifestyle.jpg")
          }}
        />
        <div className="article_text">
          <div className="avatar-wrapper">
            <img
              src={require("../../../assets/img/avatar-1.jpg")}
              alt="Avatar"
              className="avatar"
            />
            <div className="name_minutes">
              <span className="author_name">Joe Doe</span> <br />
              <span className="date_read_time">Nov 7,2018 . 3min read</span>
            </div>
          </div>
          <h3>Only I can change my life. No one can do it me</h3>
          <div className="tex-content__body">
            Bacon ipsum dolor sit amet bresaola shoulder ribeye jerky tongue
            andouille kevin meatloaf fatback shank bacon turkey turducken spare
            ribs chuck.
          </div>
          <span className="cat">FILM</span>
          <div className="icons">
            <div className="left-icons">
              <img
                src={require("../../../assets/img/thumb-up-outline.svg")}
                alt="likes"
                className="likes"
              />
              <div>3,844</div>
              <img
                src={require("../../../assets/img/thumb-down-outline.svg")}
                alt="dislikes"
                className="dislikes"
              />
              <div>3,844</div>
              <img
                src={require("../../../assets/img/comment-multiple-outline.svg")}
                alt="comments"
                className="comments"
              />
              <div>3,844</div>
            </div>
            <div className="right-icons">
              <img
                src={require("../../../assets/img/bookmark.svg")}
                alt="bookmark"
                className="bookmark"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
