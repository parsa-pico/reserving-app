import React, { useState, useEffect } from "react";
import { Input } from "./common/Inputs";
import ReserveTimeService from "./services/ReserveTimeService";
export default function Profile() {
  const [customerDetails, setCustomerDetails] = useState({});
  const [change, setChange] = useState(false);
  async function getUserInfo() {
    const { firstName, lastName } =
      await ReserveTimeService.getUserCustomDataWithSearch();

    setCustomerDetails({ firstName, lastName });
  }
  useEffect(() => {
    getUserInfo();
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
        <div disabled={!change} onChange={handleCustomerDetails}>
          <Input value={customerDetails.firstName} id={"firstName"} />
          <Input value={customerDetails.lastName} id={"lastName"} />
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
    </div>
  );
}
