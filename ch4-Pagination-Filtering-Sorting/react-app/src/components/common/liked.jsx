import React from "react";

const Liked = ({ liked, onClick }) => {
  let className = "fa fa-heart";
  if (!liked) className += "-o";
  return (
    <i
      className={className}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    ></i>
  );
};

export default Liked;
