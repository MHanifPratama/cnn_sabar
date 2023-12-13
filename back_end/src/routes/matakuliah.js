const express = require("express");
const MataKuliahController = require("../controller/matakuliah.js");
const routes = express.Router();

routes.get("/", MataKuliahController.getAllMataKuliah);
routes.get("/count", MataKuliahController.countMataKuliah);
routes.post("/", MataKuliahController.createNewMataKuliah);
routes.get("/:id", MataKuliahController.detailMataKuliah);
routes.patch("/:id", MataKuliahController.updateMataKuliah);
routes.delete("/:id", MataKuliahController.deleteMataKuliah);

module.exports = routes;
