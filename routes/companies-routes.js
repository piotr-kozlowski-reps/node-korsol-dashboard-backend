const express = require("express");
const companiesController = require("../controllers/companies-controller");

const router = express.Router();

router.get("/", companiesController.getCompanies);
// router.post("/", ownersController.postOwners);
// router.put("/", ownersController.putOwners);
// router.delete("/:ownerId", ownersController.deleteOwners);

module.exports = router;
