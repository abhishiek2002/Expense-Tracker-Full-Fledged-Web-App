import Payment from "../Models/PaymentModel.js";
import User from "../Models/UserModel.js";
import { createOrder, fetchPayment } from "../Services/cashfree-payment.js";
import sequelize from "../Utils/db-connection.js";

async function create(req, res) {
  const user = req.user;
  const { orderAmount, orderCurrency } = req.body;

  const orderID = "Order-" + Date.now();
  const customerID = String(user.id);
  const customerPhone = "9999999999";

  const transaction = await sequelize.transaction();

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

    // save order to
    // save payment to database
    const payment = await Payment.create(
      {
        orderID,
        paymentSessionID,
        orderAmount,
        orderCurrency,
        paymentStatus: "Pending",
      },
      { transaction }
    );

    const paymentUser = await User.findByPk(user.id, { transaction });

    await paymentUser.addPayment(payment, { transaction });

    transaction.commit();
    res.status(200).json({
      paymentSessionID,
    });
  } catch (error) {
    console.log("Error:", error);
    transaction.rollback();
    res.status(502).json({
      error: error.message,
    });
  }
}

async function verifyPayment(req, res) {
  const orderID = req.params.orderID;

  try {
    let getOrderResponse = await fetchPayment(orderID); //Get Order API Response
    let orderStatus;

    if (
      getOrderResponse.filter(
        (transaction) => transaction.payment_status === "SUCCESS"
      ).length > 0
    ) {
      orderStatus = "Success";
    } else if (
      getOrderResponse.filter(
        (transaction) => transaction.payment_status === "PENDING"
      ).length > 0
    ) {
      orderStatus = "Pending";
    } else {
      orderStatus = "Failure";
    }

    // generate transaction for the database
    const transaction = await sequelize.transaction();

    // save payment status to database
    await Payment.update(
      {
        paymentStatus: orderStatus,
      },
      { where: { orderID: orderID }, transaction }
    );

    // update membership of user

    if (orderStatus === "Success") {
      // get userId
      const order = await Payment.findByPk(orderID, { transaction });

      // update membership of user
      if (order) {
        await User.update(
          {
            membership: "Premium",
          },
          {
            where: {
              id: order.UserId,
            },
            transaction,
          }
        );
      }
    }

    transaction.commit();

    res.status(200).json({
      orderStatus,
    });
  } catch (error) {
    transaction.rollback();
    console.error("Error while verifying payment:", error);
    res.status(502).json({
      error: error.message,
    });
  }
}

export { create, verifyPayment };
