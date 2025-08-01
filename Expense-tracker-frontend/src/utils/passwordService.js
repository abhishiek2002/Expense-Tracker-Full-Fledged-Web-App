import axios from "axios";

class Password {
  static baseUrl = "http://localhost:5000/password/forgotPassword";

  static async forgotPassword(email) {
    try {
      const response = await axios.post(this.baseUrl, { email });

      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.error, error?.message);
      throw new Error(error?.response?.data?.error || error?.message);
    }
  }

  //   static async resetPassword(token, newPassword) {
  //     try {
  //       const response = await fetch("/api/reset-password", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ token, newPassword }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to reset password");
  //       }

  //       const data = await response.json();
  //       return data.message;
  //     } catch (error) {
  //       throw new Error(error.message);
  //     }
  //   }
}

export default Password;
