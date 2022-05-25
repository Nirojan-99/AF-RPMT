const Router = require("express").Router;
const router = Router();
const fileUpload = require("express-fileupload");

const SubmissionCtrl = require("../Controller/SubmissionCtrl");
const auth = require("../Middleware/auth");
const { authAdmin, authStaff } = require("../Middleware/authAdmin");

router.use(fileUpload());

router.get("/", auth, SubmissionCtrl.GetSubmissions);

router
  .route("/:_id")
  .get(auth, SubmissionCtrl.GetSubmision)
  .post(auth, authAdmin, SubmissionCtrl.AddSubmission)
  .put(auth, authAdmin, SubmissionCtrl.EditSubmission)
  .delete(auth, authAdmin, SubmissionCtrl.DeleteSubmission);

module.exports = router;
