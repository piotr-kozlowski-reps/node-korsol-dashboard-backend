const express = require("express");
const plantsVarietiesController = require("../controllers/plants-varieties-controller");

const router = express.Router();

router.get("/", plantsVarietiesController.getPlantVarieties);

module.exports = router;
