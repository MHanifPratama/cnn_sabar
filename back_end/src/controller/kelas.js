const { Kelas } = require("../models");

const getAllKelas = async (req, res) => {
   try {
      const data = await Kelas.findAll();
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

const createNewKelas = async (req, res) => {
   const { body } = req;
   try {
      if (!body.nama_kelas) {
         return res.status(400).json({
            message: "Bad Request",
            data: [],
         });
      }
      const data = await Kelas.create({
         nama_kelas: body.nama_kelas,
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

const updateKelas = async (req, res) => {
   try {
      const { id } = req.params;
      const { body } = req;
      await Kelas.update(
         {
            nama_kelas: body.nama_kelas,
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

const deleteKelas = async (req, res) => {
   try {
      const { id } = req.params;
      await Kelas.destroy({
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
            return resstatus(200).json({
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

const detailKelas = async (req, res) => {
   try {
      await Kelas.findOne({
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
   getAllKelas,
   createNewKelas,
   updateKelas,
   deleteKelas,
   detailKelas,
};
