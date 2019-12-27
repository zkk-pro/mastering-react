import React, { Component } from "react";
import Joi from "@hapi/joi";
import Input from "./Input";


class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  schema = Joi.object(this.rules);
  validate = () => {
    const { error } = this.schema.validate(this.state.data, {
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

    let data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput(name, label) {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name]}
        name={name}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary"
        type="submit"
      >
        {label}
      </button>
    );
  }
}

export default Form;
