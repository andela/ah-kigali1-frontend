import React, { Component } from "react";
import PropTypes from "prop-types";
/* eslint jsx-a11y/click-events-have-key-events: "off" */

class Categories extends Component {
  constructor(props) {
    super(props);
    const { catList } = this.props;
    this.state = { focused: catList[0] };
  }

  render() {
    const { catList, onClick, onMoreClick, ...props } = this.props;
    const { focused } = this.state;
    return (
      <div className="category-container" {...props}>
        <div className="category-left">
          <div className="category-list">
            {catList.map((category, index) => (
              <li
                onClick={() => {
                  this.setState({ focused: category });
                  return onClick(category);
                }}
                key={Number(index)}
                className={category === focused ? "current" : null}
              >
                {category}
              </li>
            ))}
          </div>
        </div>
        <div onClick={() => onMoreClick()} className="category-right">
          MORE
        </div>
      </div>
    );
  }
}
Categories.propTypes = {
  catList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired
};
export default Categories;
