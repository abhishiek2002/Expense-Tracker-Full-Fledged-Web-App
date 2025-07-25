// import { Cashfree, CFEnvironment } from "cashfree-pg";
import "dotenv/config"

// const cashfree = new Cashfree(
//   CFEnvironment.SANDBOX,
//   process.env.APPID,
//   process.env.SECRETKEY
// );

// async function createOrder({
//   orderAmount,
//   orderCurrency,
//   orderID,
//   customerID,
//   customerPhone,
// }) {
//   const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
//   const formattedExpiryDate = expiryDate.toISOString();

//   try {
//     const response = await cashfree.PGCreateOrder({
//       order_amount: orderAmount,
//       order_currency: orderCurrency,
//       order_id: orderID,
//       customer_details: {
//         customer_id: customerID,
//         customer_phone: customerPhone,
//       },
//       order_meta: {
//         return_url: "http://localhost:5000/payment-status" + orderID,
//         payment_methods: "ccc, upi, nb",
//       },
//       order_expiry_time: formattedExpiryDate, // set then valid expire
//     });
//     return response.data.payment_session_id;
//   } catch (error) {
//     console.log("Error:", error.response.data.message);
//   }
// }

// async function getPaymentStatus(orderID) {

//   try {
//     const response = await cashfree.PGOrderFetchPayment(orderID);
//     return response.data.payment_session_id;
//   } catch (error) {
//     console.log("Error:", error.response.data.message);
//   }
// }

// export default createOrder;

import { Cashfree, CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.APPID,
  process.env.SECRETKEY
);

async function createOrder({
  orderAmount,
  orderCurrency,
  orderID,
  customerID,
  customerPhone,
}) {
  const expiredTime = new Date(Date.now() + 60 * 16 * 1000);
  const formattedExpiryDate = expiredTime.toISOString();
  const request = {
    order_amount: orderAmount,
    order_currency: orderCurrency,
    order_id: orderID,
    customer_details: {
      customer_id: customerID,
      customer_phone: customerPhone,
    },
    order_meta: {
      return_url: "http://localhost:5000/payments/verify/" + orderID,
      payment_methods: "ccc, upi, nb",
    },
    order_expiry_time: formattedExpiryDate,
  };

  console.log(request);
  

  try {
    const response = await cashfree.PGCreateOrder(request);
    return response;
  } catch (error) {
    console.error("Error:", error.response.data.message);
    throw Error(error.response.data.message);
  }
}

async function fetchPayment(orderID) {
  try {
    const response = await cashfree.PGOrderFetchPayments(orderID);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data.message);
    throw Error(error.response.data.message);
  }
}


export {createOrder, fetchPayment}
