const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const UserModel = require("../Model/UserModel");
const GroupModel = require("../Model/GroupModel");
const { mailSender } = require("../Utils/mailSender");

//user login
exports.Login = (req, res) => {
    //incomming data
    const { email, password } = req.body;
  
    UserModel.findOne({ email }, { role: 1, email: 1, password: 1 })
      .then((data) => {
        //compare password
        if (data._id) {
          const result = bcrypt.compareSync(password, data.password);
  
          if (result) {
            //generate token
            const token = jwt.sign(
              { userID: data._id, email: data.email },
              "rpmtvalidation",
              { expiresIn: "2h" }
            );
  
            return res
              .status(200)
              .json({ auth: true, token, role: data.role, _id: data._id });
          }
        } else {
          return res.status(404).json({ auth: false });
        }
      })
      .catch((er) => {
        return res.status(404).json({ auth: false });
      });
  };