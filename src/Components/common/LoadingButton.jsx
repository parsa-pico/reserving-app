import React from "react";
import Spinner from "react-bootstrap/Spinner";
export default function LoadingButton({
  children,
  disabled,
  className,
  spinner,
  type = "submit",
  ...rest
}) {
  return (
    <button
      {...rest}
      type={type}
      className={"btn btn-primary w-100 " + className}
      disabled={disabled}
    >
      {spinner && (
        <Spinner as="span" animation="border" size="sm" role="status" />
      )}
      {children}
    </button>
  );
}
