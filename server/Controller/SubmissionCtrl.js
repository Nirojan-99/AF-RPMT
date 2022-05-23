const fs = require("fs");
const SubmissionModel = require("../Model/SubmissionModel");

//get all submissions
exports.GetSubmissions = (req, res) => {
  SubmissionModel.find({ visibility: true }, {})
    .then((data) => {
      if (data) {
        return res.status(200).json({ data });
      } else {
        return res.status(404).json({ fetched: false });
      }
    })
    .catch((er) => {
      return res.status(404).json({ fetched: false });
    });
};
