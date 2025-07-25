import Payment from "../Models/PaymentModel.js";
import { createOrder, fetchPayment } from "../Services/cashfree-payment.js";

async function create(req, res) {
  const user = req.user;
  const { orderAmount, orderCurrency } = req.body;

  const orderID = "Order-" + Date.now();
  const customerID = String(user.id);
  const customerPhone = "9999999999";

  try {
    // create payment order and get payment id
    const response = await createOrder({
      orderAmount,
      orderCurrency,
      orderID,
      customerID,
      customerPhone,
    });

    const paymentSessionID = response.data.payment_session_id;

    // save payment to database
    // await Payment.create({
    //   orderID: orderID.split("-")[1],
    //   paymentSessionID,
    //   orderAmount,
    //   orderCurrency,
    //   paymentStatus: "Pending",
    // });

    res.status(200).json({
      paymentSessionID,
    });
  } catch (error) {
    console.log("Error:", error);
    res.json({
      error: error.message,
    });
  }
}

async function verifyPayment(req, res) {
  const orderID = req.params.orderID;

  try {
    const response = await fetchPayment(orderID);
    

    // save payment to database
    // await Payment.update({
    //   orderID: orderID.split("-")[1],
    //   paymentSessionID,
    //   orderAmount,
    //   orderCurrency,
    //   paymentStatus: "Pending",
    // });

    res.status(200).json({
      response,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

export { create, verifyPayment };
