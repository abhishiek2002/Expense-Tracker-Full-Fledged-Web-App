import bcrypt from "bcrypt";

class Encryption {
  constructor() {
    this.saltRounds = 10;
  }
  async compare(password, storedHash) {
    // password is the string that is received from client side
    try {
      const result = await bcrypt.compare(password, storedHash);
      return result; // true or false
    } catch (error) {
      throw error;
    }
  }

  async encrypt(stringValue) {
    try {
      const hashValue = await bcrypt.hash(stringValue, this.saltRounds);
      return hashValue;
    } catch (error) {
      throw error;
    }
  }
}

const encryptInstance = new Encryption();

export default encryptInstance;
