const express = require("express");
const greenhousesController = require("../controllers/greenhouses-controller");

const router = express.Router();

router.get("/", greenhousesController.getGreenhouses);
router.post("/", greenhousesController.postGreenhouse);
router.put("/", greenhousesController.putGreenhouse);
router.delete("/:greenhouseId", greenhousesController.deleteGreenhouse);

module.exports = router;
