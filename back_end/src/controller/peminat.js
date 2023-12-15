const { Peminat } = require("../models");

const getAllPeminat = async (req, res) => {
   try {
      const data = await Peminat.findAll();
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

const createNewPeminat = async (req, res) => {
   const { body } = req;
   try {
      if (!body.id_mahasiswa || !body.id_mk) {
         return res.status(400).json({
            message: "Bad Request",
            data: [],
         });
      }
      const data = await Peminat.create({
         id_mahasiswa: body.id_mahasiswa,
         id_mk: body.id_mk,
      });
      return res.status(201).json({
         message: "Success",
         data: data,
      });
   } catch (error) {
      return res.status(500).json({
         message: "Server Error",
         error: error,
      });
   }
};

const updatePeminat = async (req, res) => {
   try {
      const { id } = req.params;
      const { body } = req;
      console.log(body);
      await Peminat.update(
         {
            id_mahasiswa: body.id_mahasiswa,
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
               message: "Data not found",
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
      return res.json({
         message: "Server Error",
         error: error,
      });
   }
};

const deletePeminat = async (req, res) => {
   try {
      const { id } = req.params;
      await Peminat.destroy({
         where: {
            id: id,
         },
      }).then(function (result) {
         if (result == 0) {
            return res.status(404).json({
               message: "Data not found",
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
      return res.json({
         message: "Server Error",
         error: error,
      });
   }
};

const detailPeminat = async (req, res) => {
   try {
      const { id } = req.params;
      const data = await Peminat.findOne({
         where: {
            id: id,
         },
      });
      if (!data) {
         return res.status(404).json({
            message: "Data not found",
            data: [],
         });
      } else {
         return res.status(200).json({
            message: "Success",
            data: data,
         });
      }
   } catch (error) {
      return res.status(505).json({
         message: "Server Error",
         error: error,
      });
   }
};

const countPeminat = async (req, res) => {
   try {
       const data = await Peminat.count();
       return res.json({
           message: "Success",
           data: data
       })
   }
   catch (error) {
       return res.json({
           message: "Server Error",
           error: error
       })
   }
}

module.exports = {
   getAllPeminat,
   createNewPeminat,
   updatePeminat,
   deletePeminat,
   detailPeminat,
   countPeminat
};
