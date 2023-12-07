const express = require("express");
const KelasController = require("../controller/kelas.js");
const routes = express.Router();

routes.get("/", KelasController.getAllKelas);
routes.post("/", KelasController.createNewKelas);
routes.get("/:id", KelasController.detailKelas);
routes.patch("/:id", KelasController.updateKelas);
routes.delete("/:id", KelasController.deleteKelas);

module.exports = routes;
