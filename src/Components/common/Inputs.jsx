import React from "react";

export function RadioButton({ id, name, label, ...rest }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name={name}
        id={id}
        {...rest}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
export function Input({ id, type = " text", ...rest }) {
  return (
    <>
      <label htmlFor={id}>{id}</label>
      <input id={id} type={type} {...rest} className="form-control" />
    </>
  );
}
