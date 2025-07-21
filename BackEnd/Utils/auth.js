import jwt from "jsonwebtoken";

const secretKey = process.env.secretKey || "private-key";

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "1d",
  });
}

export default createToken;
