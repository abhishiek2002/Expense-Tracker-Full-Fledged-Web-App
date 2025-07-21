class Expense {
  constructor() {
    this.baseURL = "http://localhost:3000/expenses";
  }

  async getExpenses() {
    try {
      const res = await axios.get(this.baseURL);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async addExpenses({ amount, description, category }) {
    try {
      const res = await axios.post(this.baseURL + "/add", {
        amount,
        description,
        category,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async deleteExpenses(id) {
    try {
      const res = await axios.delete(this.baseURL + `/remove/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

const expenseClassInstance = new Expense();

export default expenseClassInstance;
