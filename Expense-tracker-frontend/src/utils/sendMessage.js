import axios from "axios";

const baseURL = "https://expense-tracker-full-fledged-web-app.onrender.com";

const sendMessage = async (name, email, message) => {
  try {
    const res = await axios.post(baseURL + "/sendMessage", {
      name,
      email,
      message,
    });

    return res.data.message;
  } catch (error) {
    throw new Error(error?.response?.message || error.message);
  }
};

export { sendMessage };
