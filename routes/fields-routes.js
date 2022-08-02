const express = require("express");
const fieldsController = require("../controllers/fields-controller");

const router = express.Router();

router.get("/", fieldsController.getFields);
router.post("/", fieldsController.postFields);
router.put("/", fieldsController.putFields);
router.delete("/:fieldId", fieldsController.deleteFields);

module.exports = router;
