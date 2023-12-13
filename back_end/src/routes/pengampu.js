const express = require("express");
const PengampuController = require("../controller/pengampu.js");
const routes = express.Router();

routes.get("/", PengampuController.getAllPengampu);
routes.get("/count", PengampuController.countPengampu);
routes.post("/", PengampuController.createNewPengampu);
routes.get("/:id", PengampuController.detailPengampu);
routes.patch("/:id", PengampuController.updatePengampu);
routes.delete("/:id", PengampuController.deletePengampu);

module.exports = routes;
