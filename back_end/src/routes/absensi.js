const express = require("express");
const AbsensiController = require("../controller/absensi.js");
const routes = express.Router();

routes.get("/", AbsensiController.getAllAbsensi);
routes.get("/count", AbsensiController.countAbsensi);
routes.get("/:id", AbsensiController.detailAbsensi);
routes.post("/", AbsensiController.createNewAbsensi);
routes.patch("/:id", AbsensiController.updateAbsensi);
routes.delete("/:id", AbsensiController.deleteAbsensi);

module.exports = routes;