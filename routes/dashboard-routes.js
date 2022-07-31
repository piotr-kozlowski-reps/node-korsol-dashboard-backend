const express = require("express");
const dashboardControllers = require("../controllers/dashboard-controller");

const router = express.Router();

router.get("/", dashboardControllers.fetchDashboard);

module.exports = router;
