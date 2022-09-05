import React, { useEffect, useState } from "react";
import { RadioButton, CustomInput } from "./common/Inputs";

export default function ReserveBox() {
  const fakeTimeService = [
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
  ];
  const [reserveTime, setReserveTime] = useState([]);
  const [checkedTime, setCheckedTime] = useState("");

  useEffect(() => {
    setReserveTime(fakeTimeService);
  }, []);

  const handleSubmitReserve = (e, value) => {
    e.preventDefault();
    //changing database
    const reserveObj = [...reserveTime];
    const index = reserveObj.findIndex((timeObj) => timeObj.value == value);
    const timeObj = { ...reserveObj[index], isChecked: true };
    reserveObj[index] = timeObj;
    //updating ui
    setReserveTime(reserveObj);
    console.log(reserveObj);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmitReserve(e, checkedTime)}>
        <div onChange={({ target }) => setCheckedTime(target.value)}>
          {reserveTime.map((timeObj) => (
            <RadioButton
              key={timeObj.value}
              id={timeObj.value}
              name="group1"
              label={timeObj.label}
              value={timeObj.value}
              disabled={timeObj.isChecked}
            />
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
