import React, { Component } from "react";
import Joi from "@hapi/joi";
import Input from "./common/Input";

class LoginForm extends Component {
  username = React.createRef();
  state = {
    formData: {
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
  schema = Joi.object(this.rules);
  validate = () => {
    const { error } = this.schema.validate(this.state.formData, {
      abortEarly: false
    });
    if (!error) return null;

    const errors = {};
    error.details.forEach(item => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };
  validateProperty = ({ name, value }) => {
    // [name]表示动态key
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.rules[name] });
    const { error } = schema.validate(obj);
    return error ? error.message : null;
  };

  // 阻止表单默认提交行为
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    let formData = { ...this.state.formData };
    formData[input.name] = input.value;
    this.setState({ formData, errors });
  };
  render() {
    const { formData, errors } = this.state;
    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={formData.username}
            name="username"
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            value={formData.password}
            name="password"
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
