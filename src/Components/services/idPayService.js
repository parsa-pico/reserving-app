import ReserveTimeService from "./ReserveTimeService";
import { app } from "./../realmConfig";
async function payment(name) {
  const orderId = await ReserveTimeService.getOrderId();
  const result = await app.currentUser.functions.idPayPayment(
    orderId.toString(),
    name
  );
  const { id: paymentId, link: paymentLink } = result.data;
  return { paymentId, paymentLink };
}

export default {
  payment,
};