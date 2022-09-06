import React, { useEffect, useState } from "react";
import { RadioButton, CustomInput } from "./common/Inputs";
import mongoDbService from "./services/mongoDbService";

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

  const handleSubmitReserve = async (e, value) => {
    e.preventDefault();
    //changing database
    const reserveObj = [...reserveTime];
    const index = reserveObj.findIndex((timeObj) => timeObj.value === value);
    const timeObj = { ...reserveObj[index], isChecked: true };
    reserveObj[index] = timeObj;
    //updating ui
    setReserveTime(reserveObj);
    console.log(reserveObj);
    const test = { time: value };
    const result = await mongoDbService.post(test, "ReservedTimes");
    console.log(result);
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
              disabled={timeObj.isChecked === true}
            />
          ))}
        </div>

        <button className="btn btn-primary" type="submit">
          Reserve your time
        </button>
      </form>
    </div>
  );
}
