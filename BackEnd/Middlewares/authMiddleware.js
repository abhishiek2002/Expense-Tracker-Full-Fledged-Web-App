import jwt from "jsonwebtoken";

const secretKey = process.env.secretKey || "private-key";

function verify(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  
  

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorized access",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Forbidden - Invalid Token" });
  }
}

export default verify;
