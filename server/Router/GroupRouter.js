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
module.exports = router;