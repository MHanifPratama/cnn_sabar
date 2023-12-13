const express = require("express");
const Ruangancontroller = require("../controller/ruangan");
const routes = express.Router();

routes.get("/", Ruangancontroller.getAllRuangan);
routes.get("/count", Ruangancontroller.countRuangan);
routes.post("/", Ruangancontroller.createNewRuangan);
routes.get("/:id", Ruangancontroller.detailRuangan);
routes.patch("/:id", Ruangancontroller.updateRuangan);
routes.delete("/:id", Ruangancontroller.deleteRuangan);

module.exports = routes;
