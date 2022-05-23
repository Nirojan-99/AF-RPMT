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

//single user password
router
  .route("/password/:_id")
  .patch(auth, UserCtrl.ChangePassword)
  .put(UserCtrl.ResetPassword);

//dp route
router
  .route("/dp/:_id")
  .put(auth, UserCtrl.UpdateDp)
  .delete(auth, UserCtrl.RemoveDp)
  .get(auth, UserCtrl.GetDp);

//register & all users
router
  .route("/")
  .post(UserCtrl.Register)
  .get(auth, authAdmin, UserCtrl.GetUsers);

//staff related grping
router.route("/staff/:_id/groups").get(auth, authStaff, UserCtrl.GetGroup);

module.exports = router;
