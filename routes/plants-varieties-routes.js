const express = require("express");
const plantsVarietiesController = require("../controllers/plants-varieties-controller");

const router = express.Router();

router.get("/", plantsVarietiesController.getPlantVarieties);
router.post("/", plantsVarietiesController.postPlantVarieties);
router.put("/", plantsVarietiesController.putPlantVarieties);
router.delete("/:plantId", plantsVarietiesController.deletePlantVarieties);

module.exports = router;
