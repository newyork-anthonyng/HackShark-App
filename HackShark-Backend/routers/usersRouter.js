const express = require("express");
const router = express.Router();
const { registerNewUser, getAllWeeklyEmails } = require("../controllers/usersController")


router.post("/register", registerNewUser)

router.get("/weeklyEmails", getAllWeeklyEmails)



module.exports = router