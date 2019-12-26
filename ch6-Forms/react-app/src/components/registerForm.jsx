import React from "react";

const Register = () => {
  return (
    <div className="container">
      <h2>Register</h2>
      <form action="">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="text" className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Register;
