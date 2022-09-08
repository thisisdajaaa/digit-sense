const express = require("express");
const {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} = require("../controllers/users");
const User = require("../models/User");
const advancedResults = require("../middlewares/advancedResults");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.use(protect);

router.route("/").get(advancedResults(User), getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
