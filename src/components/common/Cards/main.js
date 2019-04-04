import React, { Component } from "react";

export default class MainCard extends Component {
  render() {
    return (
      <div className="left">
        <div className="article-card">
          <div className="avatar-wrapper">
            <img
              src={require("../../../assets/img/avatar-1.jpg")}
              alt="Avatar"
              className="avatar"
            />
            <div className="name_minutes medium-main">
              <span className="author_name">Joe Doe</span> <br />
              <span className="date_read_time">Nov 7,2018 . 3min read</span>
            </div>
          </div>
          <div
            className="main-article-img"
            style={{
              backgroundImage: require("../../../assets/img/background-2.jpg")
            }}
          >
            <span className="cat">TECH</span>
          </div>
          <div className="tex-content">
            <h3>Only I can change my life. No one can do it me</h3>
            <div className="tex-content__body">
              Bacon ipsum dolor sit amet bresaola shoulder ribeye jerky tongue
              andouille kevin meatloaf fatback shank bacon turkey turducken
              spare ribs chuck.
            </div>
            <div className="icons">
              <div className="left-icons">
                <img
                  src={require("../../../assets/img/thumb-up-outline.svg")}
                  alt="likes"
                  className="likes"
                />
                <div className="numbers">3,844</div>
                <img
                  src={require("../../../assets/img/thumb-down-outline.svg")}
                  alt="dislikes"
                  className="dislikes"
                />
                <div className="numbers">3,844</div>
                <img
                  src={require("../../../assets/img/comment-multiple-outline.svg")}
                  alt="comments"
                  className="comments"
                />
                <div className="numbers">3,844</div>
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
      </div>
    );
  }
}
