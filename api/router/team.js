const { registerTeam } = require("../controller/team");

const router = require("express").Router();

//create team
router.post("/register", registerTeam);

module.exports = router;
