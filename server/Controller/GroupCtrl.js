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
  
  //update topic status
exports.UpdateTopicStatus = (req, res) => {
    const { _id } = req.params;
    const { action } = req.body;
    GroupModel.findByIdAndUpdate(
      { _id },
      { $set: { [`research_Topic.status`]: action } }
    )
      .then((data) => {
        return res.status(200).json({ updated: true });
      })
      .catch((er) => {
        console.log(er.message);
        return res.status(404).json({ updated: false });
      });
  };
  
  //update new topic
exports.UpdateTopic = (req, res) => {
    const { _id } = req.params;
    const { topic } = req.body;
  
    GroupModel.findById({ _id }, { research_Topic_doc: 1 })
      .then((data) => {
        if (data.research_Topic_doc) {
          const path = data.research_Topic_doc.split(process.env.URL)[1];
          fs.unlink(path, (er) => {
            if (er) {
              console.log(er);
            }
          });
        }
      })
      .catch((er) => {});
  
    GroupModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          [`research_Topic.name`]: topic,
          [`research_Topic.status`]: "false",
          research_Topic_doc: "",
        },
      }
    )
      .then((data) => {
        return res.status(200).json({ updated: true });
      })
      .catch((er) => {
        return res.status(404).json({ updated: false });
      });
  };

  //get all group
exports.GetGroups = (req, res) => {
    GroupModel.find({})
      .populate({ path: "leader", select: "name" })
      .populate({ path: "supervisor", select: "name" })
      .populate({ path: "coSupervisor", select: "name" })
      .populate({ path: "members", select: "name" })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  
  //admin get single group
exports.GetAdminGroup = (req, res) => {
    const { _id } = req.params;
  
    GroupModel.findById({ _id })
      .populate({ path: "leader", select: "name" })
      .populate({ path: "supervisor", select: "name" })
      .populate({ path: "coSupervisor", select: "name" })
      .populate({ path: "members", select: "name" })
      .populate({ path: "pannel", select: "name" })
      .then((data) => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(404).json({ fetched: false });
        }
      })
      .catch((er) => {
        return res.status(404).json({ fetched: false });
      });
  };

  //add pannel
exports.AddPannel = (req, res) => {
    const { _id, staff_id } = req.params;
  
    GroupModel.findByIdAndUpdate({ _id }, { $push: { pannel: staff_id } })
      .then((data) => {
        UserModel.findByIdAndUpdate(
          { _id: staff_id },
          { $push: { pannel: _id } },
          { upsert: true }
        )
          .then((data1) => {
            return res.status(200).json({ added: true });
          })
          .catch((er) => {
            return res.status(404).json({ added: false });
          });
      })
      .catch((er) => {
        return res.status(404).json({ added: false });
      });
  };

  //remove from pannel
exports.RemovePannel = (req, res) => {
    const { _id, staff_id } = req.params;
  
    GroupModel.findByIdAndUpdate({ _id }, { $pull: { pannel: staff_id } })
      .then((data) => {
        UserModel.findByIdAndUpdate({ _id: staff_id }, { $pull: { pannel: _id } })
          .then((data1) => {
            return res.status(200).json({ removed: true });
          })
          .catch((er) => {
            console.log(er);
            return res.status(404).json({ removed: false });
          });
      })
      .catch((er) => {
        console.log(er);
        return res.status(404).json({ removed: false });
      });
  };
  