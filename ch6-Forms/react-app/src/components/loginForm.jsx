import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/Form";

class LoginForm extends Form {
  username = React.createRef();
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };
  rules = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };
  render() {
    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
