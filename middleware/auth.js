var jwt = require("jsonwebtoken");


let id
const auth = (req, res, next) => {
  const header = req.headers["authorization"];
  console.log(req.headers["authorization"]);
  if (!header) {
    return res
      .status(401)
      .json({ message: "error", data: "Please Provide Token" });
  }
  const authInfo = header.split(" ");
  const bearer = authInfo[0];
  const token = authInfo[1];
  if (bearer !== "Bearer")
    return res.status(401).json({ message: "errror", data: "Invalid Bearer" });
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, user) => {
    if (user) {
      req.id = user.data;
      id = user.data
      next();
    } else {
      return res.status(401).json({ message: "error", data: "Invalid Token" });
    }
  });
};

module.exports = {auth, id};
