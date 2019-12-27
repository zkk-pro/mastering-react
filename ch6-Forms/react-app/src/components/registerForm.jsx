import React from "react";
import Joi from "@hapi/joi";
import From from "./common/Form";

class RegisterFrom extends From {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  rules = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(6)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };
  render() {
    return (
      <div className="container">
        <h2>Register</h2>
        <form>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Resiter")}
        </form>
      </div>
    );
  }
}

export default RegisterFrom;
