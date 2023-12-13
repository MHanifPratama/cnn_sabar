const express = require('express');
const PeriodeController = require('../controller/periode.js');
const routes = express.Router();


routes.get("/", PeriodeController.getAllPeriode);
routes.get("/count", PeriodeController.countPeriode);
routes.post("/", PeriodeController.createNewPeriode);
routes.get("/:id", PeriodeController.detailPeriode);
routes.patch("/:id", PeriodeController.updatePeriode);
routes.delete("/:id", PeriodeController.deletePeriode);

module.exports = routes