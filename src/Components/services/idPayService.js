import ReserveTimeService from "./ReserveTimeService";
import { app } from "./../realmConfig";
async function payment(name) {
  const orderId = await ReserveTimeService.getOrderId();
  const result = await app.currentUser.functions.idPayPayment(
    orderId.toString(),
    name
  );
  console.log(result);
  const { id: paymentId, link: paymentLink } = result.data;
  return { paymentId, paymentLink };
}
async function verify(id, order_id, track_id) {
  const result = await app.currentUser.functions.idPayValidation(
    id,
    order_id,
    track_id
  );
  return result;
}
export default {
  payment,
  verify,
};
