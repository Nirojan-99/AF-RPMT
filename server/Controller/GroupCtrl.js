const GroupModel = require("../Model/GroupModel");
const UserModel = require("../Model/UserModel");
const fs = require("fs");
require("dotenv").config();

//search group
exports.SearchGroup = (req, res) => {
    const { value } = req.params;
  
    GroupModel.find({ name: { $regex: "^" + value } })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((er) => {
        return res.status(404).json({ fetched: false });
      });
  };