const { Ruangan } = require("../models");

const getAllRuangan = async (req, res) => {
   try {
      const data = await Ruangan.findAll();
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

const createNewRuangan = async (req, res) => {
   const { body } = req;
   try {
      if (!body.id_ruangan || !body.nama_ruangan) {
         return res.status(400).json({
            message: "Bad Request",
            data: [],
         });
      }
      const data = await Ruangan.create({
         nama_ruangan: body.nama_ruangan,
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

const updateRuangan = async (req, res) => {
   try {
      const { id } = req.params;
      const { body } = req;
      await Ruangan.update(
         {
            nama_ruangan: body.nama_ruangan,
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

const deleteRuangan = async (req, res) => {
   try {
      const { id } = req.params;
      await Ruangan.destroy({
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

const detailRuangan = async (req, res) => {
   try {
      await Ruangan.findOne({
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

const countRuangan = async (req, res) => {
   try {
       const data = await Ruangan.count();
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
   getAllRuangan,
   createNewRuangan,
   updateRuangan,
   deleteRuangan,
   detailRuangan,
   countRuangan
};
