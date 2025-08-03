import axios from "axios"

class Expense {
  constructor() {
    this.baseURL = "http://localhost:5000/expenses";
    this.token = localStorage.getItem("token");
  }

  async getExpenses() {
    try {
      const res = await axios.get(this.baseURL, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentMonthExpenses() {
    try {
      const res = await axios.get(this.baseURL + '?byMonth=true', {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
    

  async addExpenses({title, amount, description, category }) {
    try {
      const res = await axios.post(
        this.baseURL + "/add",
        {
          title,
          amount: parseInt(amount, 10),
          description,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async deleteExpenses(id) {
    try {
      const res = await axios.delete(this.baseURL + `/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
}

const expenseClassInstance = new Expense();

export default expenseClassInstance;
