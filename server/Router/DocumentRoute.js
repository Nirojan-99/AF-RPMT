const Router = require("express").Router;
const router = Router();
const fileUpload = require("express-fileupload");

const DocumentCtrl = require("../Controller/DocumentCtrl");

router.use(fileUpload());

//single document
router.post(DocumentCtrl.AddDocument).put(DocumentCtrl.EditDoc);

module.exports = router;
