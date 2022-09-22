import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { isNormalUser } from "./common/UserControl";
export function ReserveBtn({ children, disabled }) {
  return (
    <OverlayTrigger
      trigger={!isNormalUser() && ["hover", "focus"]}
      overlay={<Tooltip id="tooltip-disabled">you must login first</Tooltip>}
    >
      <span className="d-inline-block">
        <button disabled={disabled()} className="btn btn-primary" type="submit">
          {children}
        </button>
      </span>
    </OverlayTrigger>
  );
}
