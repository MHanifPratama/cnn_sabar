const express = require("express");
const MahasiswaController = require("../controller/mahasiswa.js");
const routes = express.Router();

routes.get("/", MahasiswaController.getAllMahasiswa);
routes.get("/count", MahasiswaController.countMahasiswa);
routes.post("/", MahasiswaController.createNewMahasiswa);
routes.get("/:id", MahasiswaController.detailMahasiswa);
routes.patch("/:id", MahasiswaController.updateMahasiswa);
routes.delete("/:id", MahasiswaController.deleteMahasiswa);

module.exports = routes;
