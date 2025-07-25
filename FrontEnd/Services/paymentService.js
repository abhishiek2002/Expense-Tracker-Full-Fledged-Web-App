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
