import React from "react";

export const Loading = () => {
  return (
    <img
      className="loading"
      src={require("../../../assets/img/circle-loading.gif")}
      alt="loading"
    />
  );
};

export default Loading;
