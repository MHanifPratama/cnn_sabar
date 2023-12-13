const express = require("express");
const PeminatController = require("../controller/peminat.js");
const routes = express.Router();

routes.get("/", PeminatController.getAllPeminat);
routes.get("/count", PeminatController.countPeminat);
routes.post("/", PeminatController.createNewPeminat);
routes.get("/:id", PeminatController.detailPeminat);
routes.patch("/:id", PeminatController.updatePeminat);
routes.delete("/:id", PeminatController.deletePeminat);

module.exports = routes;
