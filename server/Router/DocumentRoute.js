const Router = require("express").Router;
const router = Router();
const fileUpload = require("express-fileupload");

const auth = require("../Middleware/auth");
const { authAdmin, authStaff } = require("../Middleware/authAdmin");

const DocumentCtrl = require("../Controller/DocumentCtrl");

router.use(fileUpload());

//user
router.route("/users/:_id").get(auth, DocumentCtrl.GetUserDoc);

//staff //TODO
router
  .route("/staff/:_id")
  .get(auth, authStaff, DocumentCtrl.GetStaffDoc)
  .put(auth, authStaff, DocumentCtrl.AddGrade);

//submision
router.route("/:_id/:user_id").get(auth, DocumentCtrl.GetSubmissionDoc);

//single document
router
  .route("/:_id")
  .get(auth, DocumentCtrl.GetDoc)
  .post(auth, DocumentCtrl.AddDocument)
  .put(auth, DocumentCtrl.EditDoc)
  .delete(auth, DocumentCtrl.DeleteDoc);

//all document
router.route("/").get(auth, DocumentCtrl.GetDocs);

module.exports = router;
