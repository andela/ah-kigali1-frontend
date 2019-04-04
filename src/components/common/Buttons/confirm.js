import React from "react";

const Confirm = props => {
  return (
    <div>
      <button className="btn" {...props}>
        {props.title}
      </button>
    </div>
  );
};

export default Confirm;
