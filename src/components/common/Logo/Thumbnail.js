import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import img from "../../../assets/img/quill-drawing-a-line.svg";

const Thumbnail = ({ title = "AH" }) => (
  <Link className="col-md-6 col-sm-3 brand-name" to="/">
    <div className="brand">
      <img src={img} alt="logo" className="brand" />
    </div>
    <h3>{title}</h3>
  </Link>
);

Thumbnail.propTypes = { title: PropTypes.string };
Thumbnail.defaultProps = { title: "AH" };

export default Thumbnail;
