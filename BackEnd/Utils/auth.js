import jwt from "jsonwebtoken";

const secretKey = process.env.secretKey || "private-key";

function createToken(user) {
  return jwt.sign(user, secretKey, {
    expiresIn: "1d",
  });
}

export default createToken;
