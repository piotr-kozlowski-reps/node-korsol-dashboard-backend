const express = require("express");
const varietiesController = require("../controllers/varieties-controller");

const router = express.Router();

router.get("/", varietiesController.getVarieties);
router.post("/", varietiesController.postVariety);
router.put("/", varietiesController.putVariety);
router.delete("/:id", varietiesController.deleteVariety);

module.exports = router;
