import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import idPayService from "../services/idPayService";
import LoadingButton from "./../common/LoadingButton";
import LoadingContext from "../context/LoadingContext";
import Alert from "react-bootstrap/Alert";
export default function PaymentCallback() {
  const loadingState = useContext(LoadingContext);
  const [searchParmas] = useSearchParams();
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [verifyCountDown, setVerifyCountDown] = useState(10);
  const [paymentDetails, setPaymentDetails] = useState();
  const [paymentStatus, setPaymentStatus] = useState(null);
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

  useEffect(() => {
    if (verifyCountDown !== 0 && !isBtnClicked)
      setTimeout(() => {
        setVerifyCountDown(verifyCountDown - 1);
      }, 1000);
    else if (!isBtnClicked) handleVerify();
  }, [verifyCountDown]);

  async function handleVerify() {
    try {
      loadingState.setIsLoading(true);
      const result = await idPayService.verify(
        paymentDetails.id,
        paymentDetails.order_id,
        paymentDetails.track_id
      );
      if (result.response && result.response.status !== 200) {
        console.log(result);
        throw new Error();
      }
      setPaymentStatus(true);
      loadingState.setIsLoading(false);
    } catch (error) {
      setPaymentStatus(false);
      console.log(error);
      loadingState.setIsLoading(false);
    }
  }

  return (
    <div className="container verify-callback">
      <LoadingButton
        className="verify-callback__btn"
        onClick={() => {
          setIsBtnClicked(true);
          handleVerify();
        }}
      >
        verify {verifyCountDown !== 0 && !isBtnClicked && verifyCountDown}
      </LoadingButton>

      {paymentStatus !== null && (
        <Alert
          className="m-2 verify-callback__alert"
          variant={paymentStatus === true ? "success" : "danger"}
        >
          {paymentStatus === true && "payment was successful"}
          {paymentStatus === false &&
            `payment was unsuccessful 
             id pay track id= ${paymentDetails.track_id}`}
        </Alert>
      )}
    </div>
  );
}
