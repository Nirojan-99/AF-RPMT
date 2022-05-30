const fs = require("fs");
const SubmissionModel = require("../Model/SubmissionModel");
require("dotenv").config();
const DocumentModel = require("../Model/DocumentModel");

//new submision
exports.AddSubmission = (req, res) => {
  const { _id: creator_id } = req.params;
  const { title, due_date, due_time, visibility, description, max_size } =
    req.body;
  const date = Date.now();

  if (req.files) {
    //document
    let doc = req.files.doc;
    const docName = "doc" + date + doc.name;
    const document = `${process.env.URL}Uploads/` + docName;

    //markingScheme
    let Scheme = req.files.scheme;
    const SchemeName = "Scheme" + date + Scheme.name;
    const marking_scheme = `${process.env.URL}Uploads/` + SchemeName;

    //oc upload
    doc.mv("Uploads/" + docName, (error) => {
      if (error) {
        console.log(error);
        return res.status(404).json({ added: false });
      } else {
        //Scheme upload
        Scheme.mv("Uploads/" + SchemeName, (error) => {
          if (error) {
            console.log(error);
            return res.status(404).json({ added: false });
          } else {
            const newSubmission = new SubmissionModel({
              title,
              creator_id,
              document,
              description,
              marking_scheme,
              due_date,
              max_size,
              visibility,
              due_time,
            });

            //add
            newSubmission
              .save()
              .then((data) => {
                return res.status(200).json({ added: true });
              })
              .catch((er) => {
                console.log(er);
                return res.status(404).json({ added: false });
              });
          }
        });
      }
    });
  } else {
    return res.status(404).json({ added: false });
  }
};

//edit submission
exports.EditSubmission = (req, res) => {
  const { _id } = req.params;

  const { title, due_date, due_time, description, max_size, visibility } =
    req.body;
  const date = Date.now();

  if (req.files) {
    let document;
    let marking_scheme;

    //upload new doc
    if (req.files.doc) {
      //document
      let doc = req.files.doc;
      const docName = "doc" + date + doc.name;
      document = `${process.env.URL}Uploads/` + docName;

      //
      doc.mv("Uploads/" + docName, (error) => {
        if (error) {
          console.log(error);
          return res.status(404).json({ added: false });
        }
      });
    }
    if (req.files.scheme) {
      //markingScheme
      let Scheme = req.files.scheme;
      const SchemeName = "Scheme" + date + Scheme.name;
      marking_scheme = `${process.env.URL}Uploads/` + SchemeName;

      //Scheme upload
      Scheme.mv("Uploads/" + SchemeName, (error) => {
        if (error) {
          console.log(error);
          return res.status(404).json({ added: false });
        }
      });
    }

    //update database
    SubmissionModel.findByIdAndUpdate(
      { _id },
      {
        title,
        due_date,
        due_time,
        description,
        max_size,
        visibility,
        marking_scheme,
        document,
      }
    )
      .then((data) => {
        if (document) {
          const path = data.document.split(process.env.URL)[1];
          fs.unlink(path, (er) => {
            if (er) {
              console.log(er);
            }
          });
        }
        if (marking_scheme) {
          const path = data.marking_scheme.split(process.env.URL)[1];
          fs.unlink(path, (er) => {
            if (er) {
              console.log(er);
            }
          });
        }
        return res.status(200).json({ updated: true });
      })
      .catch((er) => {
        return res.status(404).json({ updated: false });
      });
  } else {
    SubmissionModel.findByIdAndUpdate(
      { _id },
      { title, due_date, due_time, description, max_size, visibility }
    )
      .then((data) => {
        return res.status(200).json({ updated: true });
      })
      .catch((er) => {
        return res.status(404).json({ updated: false });
      });
  }
};

// delete submission
exports.DeleteSubmission = (req, res) => {
  const { _id } = req.params;

  SubmissionModel.findByIdAndDelete({ _id })
    .then((data) => {
      const doc_path = data.document.split(process.env.URL)[1];
      fs.unlink(doc_path, (er) => {
        if (er) {
          console.log(er);
        }
      });
      const scheme_Path = data.marking_scheme.split(process.env.URL)[1];
      fs.unlink(scheme_Path, (er) => {
        if (er) {
          console.log(er);
        }
      });

      //delete related documents
      DocumentModel.find({ submission_id: _id })
        .then((data) => {
          console.log(data);
          if (data) {
            data.forEach((row) => {
              //delete files
              const path = row.url.split(process.env.URL)[1];
              fs.unlink(path, (er) => {
                if (er) {
                  console.log(er);
                }
              });
              //delete from database
              DocumentModel.findByIdAndDelete({ _id: row._id })
                .then((data) => {})
                .catch((er) => {});
            });
            return res.status(200).json({ deleted: true });
          } else {
            return res.status(200).json({ deleted: true });
          }
        })
        .catch((er) => {});
    })
    .catch((er) => {
      return res.status(404).json({ deleted: false });
    });
};

//get single data
exports.GetSubmision = (req, res) => {
  const { _id } = req.params;

  SubmissionModel.findById({ _id }, { creator_id: 0 })
    .then((data) => {
      if (req.role !== "Admin") {
        data.marking_scheme = "";
      }
      return res.status(200).json({ data });
    })
    .catch((er) => {
      console.log(er);
      return res.status(404).json({ fetched: false });
    });
};

//get all submissions
exports.GetSubmissions = (req, res) => {
  // for admin
  if (req.role === "Admin") {
    SubmissionModel.find({}, {}, { sort: { _id: -1 } })
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
  } else {
    SubmissionModel.find({ visibility: true }, {}, { sort: { _id: -1 } })
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
  }
};
