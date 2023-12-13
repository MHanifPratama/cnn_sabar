const express = require("express");
const pengampuController = require("../controller/pengampu.js");
const routes = express.Router();

routes.get("/", pengampuController.getAllPengampu);
routes.post("/", pengampuController.createNewPengampu);
routes.get("/:id", pengampuController.detailPengampu);
routes.patch("/:id", pengampuController.updatePengampu);
routes.delete("/:id", pengampuController.deletePengampu);

module.exports = routes;
