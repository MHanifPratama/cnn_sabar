const express = require("express");
const Ruangancontroller = require("../controller/ruangan");
const routes = express.Router();

routes.get("/ruangan", Ruangancontroller.getAllRuangan);
routes.post("/", Ruangancontroller.createNewRuangan);
routes.get("/:id", Ruangancontroller.detailRuangan);
routes.patch("/:id", Ruangancontroller.updateRuangan);
routes.delete("/:id", Ruangancontroller.deleteRuangan);

module.exports = routes;
