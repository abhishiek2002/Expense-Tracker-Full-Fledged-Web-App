class User {
  constructor() {
    this.baseURL = "http://localhost:5000/users";
  }

  async signup({ name, email, password }) {
    console.log(name, email, password);
    try {
      const res = await axios.post(this.baseURL + "/signup", {
        name,
        email,
        password,
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

  logout() {
    localStorage.removeItem("token");
    window.location.replace("./Login/login.html");
  }
}

const userClassInstance = new User();

export default userClassInstance;
