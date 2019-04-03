import { connect } from "react-redux";
import "@babel/polyfill";
import PropTypes from "prop-types";
import React, { Component } from "react";
import BasicButton from "../components/common/Buttons/BasicButton";
import NavbarComponent from "../components/common/AppBars/Navbar";
import CategoryBarComponent from "../components/common/AppBars/CategoryBar";
import Latest from "../components/common/Cards/latest";
import Demo from "../components/common/Dialog/Dialog";
import SuccessMessage from "../components/common/Message/success";

const cats = [
  "TECH",
  "CULTURE",
  "FILM",
  "FASHION",
  "POLITICS",
  "FITNESS",
  "SCIENCE",
  "BUSINESS",
  "TRAVEL",
  "LEISURE",
  "FOOD"
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewUser: false
    };
  }

  componentDidMount() {
    this.clearMessage();
  }

  clearMessage() {
    const {
      registration: { success, message }
    } = this.props;
    this.setState({ isNewUser: success && message });
    setTimeout(() => {
      const isNewUser = false;
      this.setState({ isNewUser });
    }, 10000);
  }

  render() {
    const { isNewUser } = this.state;
    const {
      registration: { message }
    } = this.props;
    return (
      <div>
        <NavbarComponent />

        <CategoryBarComponent
          catList={cats}
          onMoreClick={() => {}}
          onClick={() => {}}
        />
        <div style={{ margin: 3, marginTop: 120 }}>
          {isNewUser ? <SuccessMessage title={message} /> : ""}

          <h2 className="home-container">Hello world, from Titan-Devs</h2>
          <BasicButton
            style={{ width: "40%" }}
            title="Save"
            onClick={() => <p>Clicked</p>}
          />
        </div>
        <Demo />
        <div className="featured_article">
          <Latest />
        </div>
        <Latest />
      </div>
    );
  }
}

Home.propTypes = {
  registration: PropTypes.any.isRequired
};
const mapStateToProps = state => ({
  articles: state.articles,
  registration: state.registration
});

export default connect(mapStateToProps)(Home);
