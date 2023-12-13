const { Pengampu } = require("../models");

const getAllPengampu = async (req, res) => {
   try {
      const data = await Pengampu.findAll();
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

const createNewPengampu = async (req, res) => {
   const { body } = req;
   try {
      if (!body.title || !body.sks) {
         return res.status(400).json({
            message: "Bad Request",
            data: [],
         });
      }
      const data = await Pengampu.create({
         id_dosen: body.id_dosen,
         id_mk: body.id_mk,
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

const updatePengampu = async (req, res) => {
   try {
      const { id } = req.params;
      const { body } = req;
      await Pengampu.update(
         {
            id_dosen: body.id_dosen,
            id_mk: body.id_mk,
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

const deletePengampu = async (req, res) => {
   try {
      const { id } = req.params;
      await Pengampu.destroy({
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

const detailPengampu = async (req, res) => {
   try {
      await Pengampu.findOne({
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
   getAllPengampu,
   createNewPengampu,
   updatePengampu,
   deletePengampu,
   detailPengampu,
};
