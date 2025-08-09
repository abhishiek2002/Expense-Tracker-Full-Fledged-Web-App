import axios from "axios";

const baseURL = "https://expense-tracker-full-fledged-web-app.onrender.com";

export async function getPaymentSessionId({ orderAmount, orderCurrency }) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(baseURL + 
      "/payments/order",
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
    const res = await axios.get(baseURL + 
      `/payments/verify/${orderID}`, {
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
