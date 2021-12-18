const express = require("express");
const {
  createPhone,
  getAllPhones,
  getPhone,
  deletePhone,
  updatePhone,
} = require("../controllers/phone");
const router = express.Router();

router.route("/").post(createPhone).get(getAllPhones);
router.route("/:id").get(getPhone).delete(deletePhone).patch(updatePhone);

module.exports = router;
