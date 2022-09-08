const express = require("express");
const {
  register,
  login,
  logout,
  getCurrentUser,
  updateDetails,
  uploadAvatar,
} = require("../controllers/auth");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/currentUser", protect, getCurrentUser);
router.put("/updatedetails", protect, updateDetails);
router.put("/uploadAvatar", protect, uploadAvatar);

module.exports = router;
