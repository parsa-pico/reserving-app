import React, { useState } from "react";
import { RadioButton, CustomInput } from "./common/Inputs";

export default function ReserveBox() {
  const [reserveTime, setReserveTime] = useState("");
  const handleReserve = (e) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <form>
        <div onChange={handleReserve}>
          <RadioButton id="first" name="reserveRadio" label="11" value="11" />
          <RadioButton id="second" name="reserveRadio" label="12" value="12" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
