const express = require("express");
const configControllers = require("../controllers/config-controller");

const router = express.Router();

router.get("/", configControllers.fetchConfig);

module.exports = router;
