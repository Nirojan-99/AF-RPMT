const Router = require("express").Router;
const router = Router();
const fileUpload = require("express-fileupload");

const UserCtrl = require("../Controller/UserCtrl");
const auth = require("../Middleware/auth");
const { authAdmin, authStaff } = require("../Middleware/authAdmin");

router.use(fileUpload());

//login
router.post("/auth", UserCtrl.Login);

//single user
router
  .route("/:_id")
  .get(auth, UserCtrl.GetUser)
  .put(auth, UserCtrl.UpdateUser)
  .delete(auth, authAdmin, UserCtrl.DeleteUser);

//forget password
router.route("/password/:email").get(UserCtrl.CheckEmail);
router.route("/password/:_id").post(UserCtrl.CheckOTP);

module.exports = router;
