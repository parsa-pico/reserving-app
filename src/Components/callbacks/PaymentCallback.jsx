import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import idPayService from "../services/idPayService";

export default function PaymentCallback() {
  const [searchParmas] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState();
  function getSearchParmas() {
    const status = searchParmas.get("status");
    const track_id = searchParmas.get("track_id");
    const id = searchParmas.get("id");
    const order_id = searchParmas.get("order_id");
    setPaymentDetails({ status, track_id, id, order_id });
  }
  useEffect(() => {
    getSearchParmas();
  }, []);
  async function handleVerify() {
    const result = await idPayService.verify(
      paymentDetails.id,
      paymentDetails.order_id
    );
    console.log(result);
  }
  console.log(paymentDetails);
  return (
    <div className="container">
      <button onClick={handleVerify} className="btn btn-primary">
        verify
      </button>
    </div>
  );
}
