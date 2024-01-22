const { Pengampu, Dosen, MataKuliah } = require("../models");

const getAllPengampu = async (req, res) => {
   try {
      const data = await Pengampu.findAll({
         include: [
            {
               model: Dosen,
               attributes: ["nip", "nama_dosen"],
            },
            {
               model: MataKuliah,
               attributes: ["title"],
            },
         ],
      });
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
      if (!body.id_dosen || !body.id_mk) {
         return res.status(400).json({
            message: "Bad Request",
            data: [],
         });
      }
      const data = await Pengampu.create({
         id_dosen: body.id_dosen,
         id_mk: body.id_mk,
      });
      return res.json({
         message: "Success",
         data: data,
      });
   } catch (error) {
      return res.json({
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
            return res.json({
               message: "Data Not Found",
               data: [],
            });
         } else {
            return res.json({
               message: "Data Updated",
               data: body,
            });
         }
      });
   } catch (error) {
      return res.json({
         message: "Server Error",
         error: error,
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
            return res.json({
               message: "Data Not Found",
               data: [],
            });
         } else {
            return res.json({
               message: "Sucess",
               data: [],
            });
         }
      });
   } catch (error) {
      return res.json({
         message: "Server Error",
         error: error,
      });
   }
};

const detailPengampu = async (req, res) => {
   try {
      const { id } = req.params;
      await Pengampu.findOne({
         include: [
            {
               model: Dosen,
               attributes: ["nip", "nama_dosen"],
            },
         ],
         where: {
            id: id,
         },
      }).then(function (result) {
         if (result == 0) {
            return res.json({
               message: "Data Not Found",
               data: [],
            });
         } else {
            return res.json({
               message: "Success",
               data: result,
            });
         }
      });
   } catch (error) {
      return res.json({
         message: "Server Error",
         error: error,
      });
   }
};

const countPengampu = async (req, res) => {
   try {
      const data = await Pengampu.count();
      return res.json({
         message: "Success",
         data: data,
      });
   } catch (error) {
      return res.json({
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
   countPengampu,
};
