const { MataKuliah } = require("../models");

const getAllMataKuliah = async (req, res) => {
   try {
      const data = await MataKuliah.findAll();
      return res.json({
         message: "Success",
         data: data,
      });
   } catch (error) {
      console.log(error);
      return res.json({
         message: "Server Error",
         error: error,
      });
   }
};

const createNewMataKuliah = async (req, res) => {
   const { body } = req;
   try {
      if (!body.title || !body.sks) {
         return res.status(400).json({
            message: "Bad Request",
            data: [],
         });
      }
      const data = await MataKuliah.create({
         title: body.title,
         sks: body.sks,
         id_kelas: body.id_kelas,
         id_periode: body.id_periode,
         id_ruangan: body.id_ruangan,
         jadwal: body.jadwal,
      });
      return res.status(200).json({
         message: "Success",
         data: body,
      });
   } catch (error) {
      return res.status(500).json({
         message: "Server Error",
         error: error,
      });
   }
};

const updateMataKuliah = async (req, res) => {
   try {
      const { id } = req.params;
      const { body } = req;
      await MataKuliah.update(
         {
            title: body.title,
            sks: body.sks,
            id_kelas: body.id_kelas,
            id_periode: body.id_periode,
            id_ruangan: body.id_ruangan,
            jadwal: body.jadwal,
         },
         {
            where: {
               id: id,
            },
         }
      ).then(function (result) {
         if (result == 0) {
            return res.status(404).json({
               message: "Data not found or could not be updated",
               data: [],
            });
         } else {
            return res.status(200).json({
               message: "Success",
               data: body,
            });
         }
      });
   } catch (error) {
      return res.status(500).json({
         message: "Server Error",
         error: error.message,
      });
   }
};

const deleteMataKuliah = async (req, res) => {
   try {
      const { id } = req.params;
      await MataKuliah.destroy({
         where: {
            id: id,
         },
      }).then(function (result) {
         if (result == 0) {
            return res.status(404).json({
               message: "Data not found while delete",
               data: [],
            });
         } else {
            return res.status(200).json({
               message: "Success",
               data: [],
            });
         }
      });
   } catch (error) {
      return res.status(500).json({
         message: "Server Error",
         error: error.message,
      });
   }
};

const detailMataKuliah = async (req, res) => {
   try {
      await MataKuliah.findOne({
         where: {
            id: req.params.id,
         },
      }).then(function (result) {
         if (result == null) {
            return res.status(404).json({
               message: "Data not found or could not be showed",
               data: [],
            });
         } else {
            return res.status(200).json({
               message: "Success",
               data: result,
            });
         }
      });
   } catch (error) {
      if (error.code === 0) {
         return res.status(404).json({
            message: "Data not found or could not be updated",
            data: {},
         });
      }
      return res.status(500).json({
         message: "Server Error",
         error: error,
      });
   }
};

module.exports = {
   getAllMataKuliah,
   createNewMataKuliah,
   updateMataKuliah,
   deleteMataKuliah,
   detailMataKuliah,
};
