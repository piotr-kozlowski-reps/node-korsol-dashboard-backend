const express = require("express");
const plantersController = require("../controllers/planters-controller");

const router = express.Router();

router.get("/", plantersController.getOwners);
router.post("/", plantersController.postOwners);
router.put("/", plantersController.putOwners);
router.delete("/:planterId", plantersController.deleteOwners);

module.exports = router;
