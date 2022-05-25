const Router = require("express").Router;
const router = Router();

const ChatCtrl = require("../Controller/ChatCtrl");

//get last date
router.route("/:group_id").get(ChatCtrl.GetLastDate);

//all
router
  .route("/:group_id/:user_id")
  .get(ChatCtrl.GetGroupMessage)
  .put(ChatCtrl.SendMessage);

module.exports = router;
