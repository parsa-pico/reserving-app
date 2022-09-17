import React, { useState, useEffect } from "react";
import { Input } from "./common/Inputs";
import ReserveTimeService from "./services/ReserveTimeService";
import { app } from "./realmConfig";
export default function Profile() {
  const [customerDetails, setCustomerDetails] = useState({});
  const [reservedTimes, setReservedTimes] = useState([]);
  const [change, setChange] = useState(false);
  async function getUserInfo() {
    const { firstName, lastName } =
      await ReserveTimeService.getUserCustomDataWithSearch();

    setCustomerDetails({ firstName, lastName });
  }

  async function getReservedTime() {
    let myTimes = await ReserveTimeService.find("ReservedTimes", {
      ownerId: app.currentUser.id,
    });
    myTimes = myTimes.sort((a, b) => {
      a = a.date.split("/").join("");
      b = b.date.split("/").join("");
      a = parseInt(a);
      b = parseInt(b);
      return a - b;
    });

    console.log(myTimes);
    setReservedTimes(myTimes);
  }
  useEffect(() => {
    getUserInfo();
    getReservedTime();
  }, []);
  const handleCustomerDetails = (e) => {
    const { id, value } = e.target;
    setCustomerDetails((prevState) => ({ ...prevState, [id]: value }));
  };

  async function handlePostCustomerDetails(e) {
    e.preventDefault();
    try {
      await ReserveTimeService.upsertUserCustomData(customerDetails);
      window.location = "/profile";
    } catch (e) {
      alert(e);
    }
  }
  return (
    <div className="container">
      <form onSubmit={handlePostCustomerDetails}>
        <div onChange={handleCustomerDetails}>
          <Input
            disabled={!change}
            value={customerDetails.firstName}
            id={"firstName"}
          />
          <Input
            disabled={!change}
            value={customerDetails.lastName}
            id={"lastName"}
          />
        </div>
        {change && (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        )}
      </form>
      {!change && (
        <button onClick={() => setChange(true)} className="btn btn-danger ">
          change
        </button>
      )}
      {reservedTimes.length == 0 && (
        <h6 className="text-secondary" style={{ textAlign: "center" }}>
          currently you dont have any reservations
        </h6>
      )}
      {reservedTimes.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">date</th>
              <th scope="col">time</th>
              <th scope="col">admin</th>
            </tr>
          </thead>
          <tbody>
            {reservedTimes.map((reserveObj) => (
              <tr key={reserveObj._id}>
                <td>{reserveObj.date}</td>
                <td>{reserveObj.time}</td>
                <td>{reserveObj.adminName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
