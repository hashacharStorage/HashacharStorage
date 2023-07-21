const router = require("express").Router();

router.get("/", (req, res) => res.send("server alive!"));

module.exports = router;
