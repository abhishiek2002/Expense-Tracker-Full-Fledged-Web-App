import axios from "axios";

const baseURL = "http://localhost:5000/contact";

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
