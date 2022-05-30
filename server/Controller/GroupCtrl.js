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

  //get topic status
exports.GetStatus = (req, res) => {
    const { _id } = req.params;
  
    GroupModel.findById({ _id }, { research_Topic: 1 })
      .then((data) => {
        return res.status(200).json({ status: data.research_Topic.status });
      })
      .catch((er) => {
        console.log(er);
        return res.status(404).json({ fetched: false });
      });
  };
  