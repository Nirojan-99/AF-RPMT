const DocumentModel = require("../Model/DocumentModel");

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
