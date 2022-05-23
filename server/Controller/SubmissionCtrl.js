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

//get single data
exports.GetSubmision = (req, res) => {
  const { _id } = req.params;
  SubmissionModel.findById({ _id }, { creator_id: 0, marking_scheme: 0 })
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((er) => {
      return res.status(404).json({ fetched: false });
    });
};

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
    const document = "http://localhost:5000/Uploads/" + docName;

    //markingScheme
    let Scheme = req.files.scheme;
    const SchemeName = "Scheme" + date + Scheme.name;
    const marking_scheme = "http://localhost:5000/Uploads/" + SchemeName;

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
};

// delete submission
exports.DeleteSubmission = (req, res) => {
  const { _id } = req.params;

  SubmissionModel.findByIdAndDelete({ _id })
    .then((data) => {
      const doc_path = data.document.split("http://localhost:5000/")[1];
      fs.unlink(doc_path, (er) => {
        if (er) {
          console.log(er);
        }
      });
      const scheme_Path = data.marking_scheme.split(
        "http://localhost:5000/"
      )[1];
      fs.unlink(scheme_Path, (er) => {
        if (er) {
          console.log(er);
        }
      });

      return res.status(200).json({ deleted: true });
    })
    .catch((er) => {
      return res.status(404).json({ deleted: false });
    });
};
