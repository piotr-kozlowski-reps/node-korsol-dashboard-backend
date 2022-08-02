const express = require("express");
const ownersController = require("../controllers/owners-controller");

const router = express.Router();

router.get("/", ownersController.getOwners);
router.post("/", ownersController.postOwners);
router.put("/", ownersController.putOwners);
router.delete("/:ownerId", ownersController.deleteOwners);

module.exports = router;
