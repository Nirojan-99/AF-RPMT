const jwt = require("jsonwebtoken");
const UserModel = require("../Model/UserModel");
const Users = require("../Model/UserModel");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(400).json({ auth: "fail" });
  }
  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    return res.status(400).json({ auth: "fail" });
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "rpmtvalidation");
  } catch (err) {
    return res.status(400).json({ auth: "fail" });
  }
  if (!decodedToken) {
    return res.status(400).json({ auth: "fail" });
  }
  req.userID = decodedToken.userID;
  userID = decodedToken.userID;

  const resp = await Users.findById(userID);
  if (resp) {
    req.role = resp.role;
  } else {
    return res.status(400).json({ auth: "fail" });
  }

  req.auth = true;
  next();
};
