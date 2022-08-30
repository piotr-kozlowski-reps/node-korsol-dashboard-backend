const express = require("express");
const companiesController = require("../controllers/companies-controller");

const router = express.Router();

router.get("/", companiesController.getCompanies);
router.post("/", companiesController.postCompanies);
// router.put("/", ownersController.putOwners);
router.delete("/:companyId", companiesController.deleteCompany);

module.exports = router;
