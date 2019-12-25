import React from "react";
import { Route, Link } from "react-router-dom";
import Post from '../post'
import Movies from '../movies'

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <ul>
        <li>
          <Link to="/admin/post">post</Link>
        </li>
        <li>
          <Link to="/admin/movies">movies</Link>
        </li>
      </ul>
      <Route path="/admin/post" component={Post} />
      <Route path="/admin/movies" component={Movies} />
    </div>
  );
};

export default Admin;
