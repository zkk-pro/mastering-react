import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to={`/products/${1}`}>productsDetail</Link>
      </li>
      <li>
        <Link to={`/post/2019/12`}>Post</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <Link to="/movies">Movies</Link>
      </li>
    </ul>
  );
};

export default NavBar;
