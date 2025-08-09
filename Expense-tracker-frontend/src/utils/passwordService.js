import axios from "axios";

class Password {
  static baseUrl = "https://expense-tracker-full-fledged-web-app.onrender.com/password";

  static async forgotPassword(email) {
    try {
      const response = await axios.post(this.baseUrl + '/forgotpassword', { email });

      // console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.error, error?.message);
      throw new Error(error?.response?.data?.error || error?.message);
    }
  }

  static async resetPassword(token, newPassword) {
    try {
      const response = await axios.post(this.baseUrl + `/resetpassword/${token}`, { newPassword });
      // console.log(response.data.message);
      
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.error || error?.message);
    }
  }
}

export default Password;
