const Team = require("../models/Team");

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).send(teams);
  } catch (error) {
    res.status(500).send(error);
  }
};

const registerTeam = async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    const savedNewTeam = await newTeam.save();

    res.status(200).json(savedNewTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while saving the team." });
  }
};

module.exports = { registerTeam,getAllTeams };
