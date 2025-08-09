import axios from "axios";

class User {
  constructor() {
    this.baseURL = "https://expense-tracker-full-fledged-web-app.onrender.com/users";
    this.token = localStorage.getItem("token");
  }

  async signup({ name, email, password, phone }) {
    console.log(name, email, password);
    try {
      const res = await axios.post(this.baseURL + "/signup", {
        name,
        email,
        password,
        number: phone,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const res = await axios.post(this.baseURL + "/login", {
        email,
        password,
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getTopUsers() {
    try {
      const res = await axios.get(this.baseURL + "/top-users", {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("token");
    window.location.replace("login.html");
  }
}

const userClassInstance = new User();

export default userClassInstance;
