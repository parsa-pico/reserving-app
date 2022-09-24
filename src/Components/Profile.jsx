import React, { useState, useEffect } from "react";
import { Input } from "./common/Inputs";
import ReserveTimeService from "./services/ReserveTimeService";
import { app } from "./realmConfig";
import UserTimesTable from "./UserTimesTable";
import { sortByPersianDate } from "./common/sortMethods";
import AdminTimesTable from "./AdminTimesTable";
import { isAdmin } from "./common/UserControl";
import axios from "axios";
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
    let myTimes = [];
    if (!isAdmin()) {
      myTimes = await ReserveTimeService.find("ReservedTimes", {
        ownerId: app.currentUser.id,
      });
    }
    if (isAdmin()) {
      myTimes = await ReserveTimeService.find("ReservedTimes", {
        adminEmail: app.currentUser.profile.email,
      });
    }
    myTimes = sortByPersianDate(myTimes);
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
      await ReserveTimeService.upsertUserCustomData({
        ...customerDetails,
        ownerEmail: app.currentUser.profile.email,
      });
      window.location = "/profile";
    } catch (e) {
      alert(e);
    }
  }
  async function idPay() {
    const r = await axios.post(
      "https://api.idpay.ir/v1.1/payment",
      {
        order_id: 101,
        amount: 10000,
        name: "پارسا ",
        phone: "09380347820",
        mail: "my@site.com",
        desc: "توضیحات پرداخت کننده",
        callback: "https://google.com/",
      },
      {
        headers: {
          "content-type": "text/json",
          "X-API-KEY": "f6a581fd-f287-4af8-b9c3-4cc383f54977",
          "X-SANDBOX": true,
        },
      }
    );
    console.log(r);
  }
  return (
    <div className="container">
      <button onClick={idPay} className="btn btn-primary">
        test
      </button>
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
      {reservedTimes && reservedTimes.length == 0 && (
        <h6 className="text-secondary" style={{ textAlign: "center" }}>
          currently you dont have any reservations
        </h6>
      )}
      {!isAdmin() && <UserTimesTable reservedTimes={reservedTimes} />}
      {isAdmin() && <AdminTimesTable reservedTimes={reservedTimes} />}
    </div>
  );
}
