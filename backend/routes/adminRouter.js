const express = require("express");
const router = express.Router();
const { adminForm, adminDeleteCourse } = require("../controllers/adminController");
const upload = require("../config/multer_config");

router.post("/courses", upload.single("image"), adminForm);
router.delete("/courses/:id", adminDeleteCourse);

module.exports = router;
