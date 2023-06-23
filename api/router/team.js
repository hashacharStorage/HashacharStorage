const { registerTeam, getAllTeams } = require("../controller/team");

const router = require("express").Router();

//get all teams
router.get("/all", getAllTeams);

//create team
router.post("/register", registerTeam);

module.exports = router;
