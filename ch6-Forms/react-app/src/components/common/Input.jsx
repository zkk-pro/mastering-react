import React from "react";

const Input = ({
  name,
  label,
  error,
  placeholder = "placeholder",
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        type="text"
        className="form-control"
        placeholder={placeholder}
      />
      {/* 只有在有错误的时候显示 */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
