const Router = require("express").Router;
const router = Router();
const fileUpload = require("express-fileupload");

const auth = require("../Middlewares/auth");
const { authAdmin } = require("../Middlewares/authAdmin");

const DocumentCtrl = require("../Controller/DocumentCtrl");

router.use(fileUpload());

//user
router.route("/users/:_id").get(auth, DocumentCtrl.GetUserDoc);

//staff
router
  .route("/staff/:_id")
  .get(auth, authAdmin, DocumentCtrl.GetStaffDoc)
  .put(auth, authAdmin, DocumentCtrl.AddGrade);

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
