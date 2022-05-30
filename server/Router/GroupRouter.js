const Router = require("express").Router;
const router = Router();
const fileUpload = require("express-fileupload");

const GroupCtrl = require("../Controller/GroupCtrl");
const auth = require("../Middleware/auth");
const { authAdmin, authStaff } = require("../Middleware/authAdmin");

router.use(fileUpload());

//search group
router.route("/searches/:value").get(auth, GroupCtrl.SearchGroup);
//topic status
router
  .route("/topics/:_id")
  .get(auth, GroupCtrl.GetStatus)
  .post(auth, GroupCtrl.AddTopicDoc)
  .put(auth, authStaff, GroupCtrl.UpdateTopicStatus) //update topic status
  .patch(auth, GroupCtrl.UpdateTopic); //update new topic

  //admin
router.route("/").get(auth, authAdmin, GroupCtrl.GetGroups); //get all grps
router.route("/admin/:_id").get(auth, GroupCtrl.GetAdminGroup); //get single grp


//add & remove pannel
router
  .route("/pannel/:_id/:staff_id")
  .put(auth, authAdmin, GroupCtrl.AddPannel)
  .delete(auth, authAdmin, GroupCtrl.RemovePannel);

  //cancel/accept request
router
.route("/:user_id/requests/:grp_id")
.put(auth, authStaff, GroupCtrl.UpdateRequest) //for staff
.patch(auth, GroupCtrl.HandleRequest) //for groups
.delete(auth, authStaff, GroupCtrl.LeftGroup); //remove from group

//get group requests data
router.route("/requests/:_id").get(auth, GroupCtrl.GetRequestedStd);

//single group
router
  .route("/:_id")
  .get(auth, GroupCtrl.GetGroup)
  .put()
  .post(auth, GroupCtrl.AddGroup);

  //grp requests
router.route("/:group_id/:role/:user_id").put(auth, GroupCtrl.Request);

//single user
router.route("/users/:_id").get(auth, GroupCtrl.GetUserGroup);

module.exports = router;