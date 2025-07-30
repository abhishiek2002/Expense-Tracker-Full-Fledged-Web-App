import { Cashfree, CFEnvironment } from "cashfree-pg";
import "dotenv/config"

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
      return_url: "http://localhost:3000/verify.html?orderID=" + orderID,
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
