import React, { useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import LoadingContext from "../context/LoadingContext";

export default function LoadingButton({
  children,
  disabled,
  className,
  spinner,
  type = "submit",
  ...rest
}) {
  const loadingState = useContext(LoadingContext);
  if (!disabled) disabled = loadingState.isLoading;
  if (!spinner) spinner = loadingState.isLoading;
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
