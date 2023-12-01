const express = require('express');
const DosenController = require('../controller/dosen.js');
const routes = express.Router();


routes.get("/", DosenController.getAllDosen);
routes.post("/", DosenController.createNewDosen);
routes.get("/:id", DosenController.detailDosen);
routes.patch("/:id", DosenController.updateDosen);
routes.delete("/:id", DosenController.deleteDosen);

module.exports = routes