class User {
  constructor() {
    this.baseURL = "http://localhost:3000/users";
  }

  async signup({ name, email, password }) {
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
}

const userClassInstance = new User();

export default userClassInstance;
