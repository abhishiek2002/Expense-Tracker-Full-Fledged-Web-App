import axios from "axios";

export async function getPaymentSessionId({ orderAmount, orderCurrency }) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:5000/payments/order",
      {
        orderAmount,
        orderCurrency,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getPaymentStatus(orderID) {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(
      `http://localhost:5000/payments/verify/${orderID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
}
