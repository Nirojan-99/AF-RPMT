const Router = require("express").Router;
const router = Router();
const fileUpload = require("express-fileupload");

const UserCtrl = require("../Controller/UserCtrl");
const auth = require("../Middleware/auth");
const { authAdmin, authStaff } = require("../Middleware/authAdmin");

router.use(fileUpload());

//login
router.post("/auth", UserCtrl.Login);


module.exports = router;