import React from "react";
import queryString from "query-string";

const Post = ({match, location}) => {
  const searchData = queryString.parse(location.search)
  return (
    <h2>
      <p>Post date: {match.params.year}-{match.params.day}</p>
      <p>data: {searchData.data}</p>
      <p>value: {searchData.value}</p>
    </h2>
  );
};

export default Post;
