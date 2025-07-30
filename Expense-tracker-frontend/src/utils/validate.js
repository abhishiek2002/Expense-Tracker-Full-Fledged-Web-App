import axios from "axios";

async function validateUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const response = await axios.get("http://localhost:5000/users/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Validation error", error);
    if(error.response) return false;
    throw error;
  }
}

export default validateUser;