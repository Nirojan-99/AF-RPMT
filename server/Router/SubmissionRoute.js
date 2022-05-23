const Router = require("express").Router;
const router = Router();
const fileUpload = require("express-fileupload");

const SubmissionCtrl = require("../Controller/SubmissionCtrl");
const auth = require("../Middleware/auth");
const { authAdmin, authStaff } = require("../Middleware/authAdmin");

router.use(fileUpload());

module.exports = router;
