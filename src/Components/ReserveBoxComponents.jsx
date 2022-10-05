import React, { useContext } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { isNormalUser } from "./common/UserControl";
import LoadingButton from "./common/LoadingButton";
import LoadingContext from "./context/LoadingContext";
export function ReserveBtn({ children, disabled }) {
  const LoadingState = useContext(LoadingContext);
  return (
    <OverlayTrigger
      trigger={!isNormalUser() && ["hover", "focus"]}
      overlay={<Tooltip id="tooltip-disabled">you must login first</Tooltip>}
    >
      <span className="d-inline-block">
        <LoadingButton
          disabled={disabled() || LoadingState.isLoading}
          spinner={LoadingState.isLoading}
          type="submit"
        >
          {children}
        </LoadingButton>
      </span>
    </OverlayTrigger>
  );
}
