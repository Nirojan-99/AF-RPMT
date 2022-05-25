const DocumentModel = require("../Model/DocumentModel");
const UserModel = require("../Model/UserModel");
const fs = require("fs");
//add doc
exports.AddDocument = (req, res) => {
  const { _id: submitted_by } = req.params;
  const { submmited_date, submission_id } = req.body;

  const date = Date.now();

  if (req.files) {
    let fileToUpload = req.files.doc;
    const fileName = submitted_by + date + fileToUpload.name;

    //add new
    fileToUpload.mv("Uploads/" + fileName, (error) => {
      if (error) {
        console.log(error);
        return res.status(404).json({ submitted: false });
      } else {
        const link = "http://localhost:5000/Uploads/" + fileName;
        UserModel.findById({ _id: submitted_by }, { group_id: 1 })
          .then((data) => {
            console.log(data.group_id);
            const newDocu = new DocumentModel({
              submitted_by,
              group_id: data.group_id,
              submmited_date,
              submission_id,
              url: link,
            });

            newDocu
              .save()
              .then((any) => {
                return res.status(200).json({ submitted: true });
              })
              .catch((er) => {
                console.log(er.message);
                return res.status(404).json({ submitted: false });
              });
          })
          .catch((er) => {
            return res.status(404).json({ submitted: false });
          });
      }
    });
  } else {
    return res.status(404).json({ submitted: false });
  }
};

//edit doc
exports.EditDoc = (req, res) => {
  const { _id } = req.params;
  const { submmited_date, submitted_by } = req.body;

  const date = Date.now();

  if (req.files) {
    let fileToUpload = req.files.doc;
    const fileName = date + fileToUpload.name;

    DocumentModel.findById({ _id }, { url: 1 }).then((data) => {
      //remove old doc
      if (data.url) {
        const path = data.url.split("http://localhost:5000/")[1];
        fs.unlink(path, (er) => {
          if (er) {
            console.log(er);
          }
        });
      }

      //add new data
      fileToUpload.mv("Uploads/" + fileName, (error) => {
        if (error) {
          console.log(error);
          return res.status(404).json({ submitted: false });
        } else {
          const link = "http://localhost:5000/Uploads/" + fileName;

          DocumentModel.findByIdAndUpdate(
            { _id },
            { submmited_date, url: link, submitted_by }
          )
            .then((data) => {
              return res.status(200).json({ updated: true });
            })
            .catch((er) => {
              return res.status(404).json({ updated: false });
            });
        }
      });
    });
  } else {
    return res.status(404).json({ updated: false });
  }
};

//delete doc
exports.DeleteDoc = (req, res) => {
  const { _id } = req.params;
  DocumentModel.findByIdAndUpdate({ _id }, { url: "" })
    .then((data) => {
      if (data.url) {
        const path = data.url.split("http://localhost:5000/")[1];
        fs.unlink(path, (er) => {
          if (er) {
            console.log(er);
          }
        });
        return res.status(200).json({ deleted: true });
      } else {
        return res.status(200).json({ deleted: true });
      }
    })
    .catch((er) => {
      return res.status(404).json({ deleted: false });
    });
};

//get doc
exports.GetDoc = (req, res) => {
  const { _id } = req.params;

  DocumentModel.findById({ _id })
    // .populate({ path: "group_id" })
    .populate({
      path: "submission_id",
      select: "document marking_scheme title description",
    })
    .populate({ path: "submitted_by", select: "name" })
    .then((data) => {
      if (data._id) {
        return res.status(200).json({ data });
      } else {
        return res.status(404).json({ fetched: false });
      }
    })
    .catch((er) => {
      return res.status(404).json({ fetched: false });
    });
};

//get all doc by submission id
exports.GetDocs = (req, res) => {
  const { page, submission_id } = req.query;
  const skip = (page - 1) * 20;
  const limit = 20;

  DocumentModel.find({ submission_id }, { skip, limit })
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

//get users doc
exports.GetSubmissionDoc = (req, res) => {
  const { _id, user_id } = req.params;

  UserModel.findById({ _id: user_id }, { group_id: 1 })
    .then((data) => {
      const group_id = data.group_id;

      DocumentModel.findOne({ submission_id: _id, group_id: group_id })
        .populate({
          path: "submission_id",
          select: "title due_date due_time max_size",
        })
        .populate({ path: "submitted_by", select: "name" })
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch((er) => {
          console.log(er);
          return res.status(404).json({ fetched: false });
        });
    })
    .catch((er) => {});
};
