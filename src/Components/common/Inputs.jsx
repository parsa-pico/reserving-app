import React from "react";

export function RadioButton({ id, name, label, error, ...rest }) {
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
      {error && <p>{error}</p>}
    </div>
  );
}
export function Input({ id, type = " text", error, ...rest }) {
  return (
    <>
      <label htmlFor={id}>{id}</label>
      <input id={id} type={type} {...rest} className="form-control" />
      {error && (
        <div className="alert alert-danger">
          <b>{error}</b>
        </div>
      )}
    </>
  );
}
