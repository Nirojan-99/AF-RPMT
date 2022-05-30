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

  //submit topic doc
exports.AddTopicDoc = (req, res) => {
    const { _id } = req.params;
    const date = Date.now();
  
    if (req.files) {
      let fileToUpload = req.files.doc;
      const fileName = "topicdoc" + _id + date + fileToUpload.name;
  
      GroupModel.findById({ _id }, { research_Topic_doc: 1 })
        .then((data) => {
          if (data.research_Topic_doc) {
            const path = data.research_Topic_doc.split(process.env.URL)[1];
            fs.unlink(path, (er) => {
              if (er) {
                console.log(er);
              } else {
              }
            });
          }
          console.log("here");
          //add new
          fileToUpload.mv("Uploads/" + fileName, (error) => {
            if (error) {
              console.log(error);
              return res.status(404).json({ updated: false });
            } else {
              const link = `${process.env.URL}Uploads/` + fileName;
              GroupModel.findByIdAndUpdate(
                { _id },
                { $set: { research_Topic_doc: link } }
              )
                .then((data) => {
                  return res.status(200).json({ updated: true });
                })
                .catch((er) => {
                  return res.status(404).json({ updated: false });
                });
            }
          });
        })
        .catch((er) => {});
    } else {
      return res.status(404).json({ updated: false });
    }
  };
  
  