const { Absensi, Peminat, Pengampu, MataKuliah, Dosen, Mahasiswa, Ruangan, Kelas, Periode } = require("../models");

const getAllAbsensi = async (req, res) => {
   try {
      const data = await Absensi.findAll({
         include: [
            {
               model: Peminat,
               attributes: {
                  exclude: ["createdAt", "updatedAt"],
               },
               include: [
                  {
                     model: Mahasiswa,
                     attributes: {
                        exclude: ["createdAt", "updatedAt"],
                     },
                  },
               ],
            },
            {
               model: Pengampu,
               attributes: {
                  exclude: ["createdAt", "updatedAt"],
               },
               include: [
                  {
                     model: Dosen,
                     attributes: {
                        exclude: ["createdAt", "updatedAt"],
                     },
                  },
               ],
            },
            {
               model: MataKuliah,
               attributes: {
                  exclude: ["createdAt", "updatedAt"],
               },
               include: [
                  {
                     model: Kelas,
                     as: "kelas",
                     attributes: {
                        exclude: ["createdAt", "updatedAt"],
                     },
                  },
                  {
                     model: Ruangan,
                     as: "ruangan",
                     attributes: {
                        exclude: ["createdAt", "updatedAt"],
                     },
                  },
                  {
                     model: Periode,
                     as: "periode",
                     attributes: {
                        exclude: ["createdAt", "updatedAt"],
                     },
                  },
               ],
            },
         ],
         attributes: {
            exclude: ["createdAt", "updatedAt"],
         },
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

const createNewAbsensi = async (req, res) => {
   const { body } = req;
   try {
      if (!body.id_peminat || !body.id_pengampu || !body.id_mk || !body.kehadiran) {
         return res.status(400).json({
            message: "Bad Request",
            data: [],
         });
      }
      const data = await Absensi.create({
         id_peminat: body.id_peminat,
         id_pengampu: body.id_pengampu,
         id_mk: body.id_mk,
         kehadiran: body.kehadiran,
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

const updateAbsensi = async (req, res) => {
   try {
      const { id } = req.params;
      const { body } = req;
      await Absensi.update(
         {
            id_peminat: body.id_peminat,
            id_pengampu: body.id_pengampu,
            id_mk: body.id_mk,
            kehadiran: body.kehadiran,
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

const deleteAbsensi = async (req, res) => {
   try {
      const { id } = req.params;
      await Absensi.destroy({
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

const detailAbsensi = async (req, res) => {
   try {
      await Absensi.findOne({
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

const countAbsensi = async (req, res) => {
   try {
      const data = await Absensi.count();
      return res.status(200).json({
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

const getJadwalAbsensi = async (req, res) => {
   const { body } = req;
   const date = Date.now();
   const dates = new Date(date + 7 * 60 * 60 * 1000).toISOString().replace(/T/, " ").replace(/\..+/, "");
   try {
      const data = await Absensi.getJadwalAbsen(dates, body.id_ruangan);
      return res.status(200).json({
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

const setAbsen = async (req, res) => {
   const { body } = req;
   try {
      console.log(body.npm);
      const data = await Absensi.setAbsensiTrue(body.npm);
      console.log(data);
      if (data[1] == 0) {
         return res.status(404).json({
            message: "Data not found or could not be updated",
         });
      } else {
         return res.status(200).json({
            message: "Success",
         });
      }
   } catch (error) {
      return res.json({
         message: "Server Error",
         error: error,
      });
   }
};

module.exports = {
   getAllAbsensi,
   createNewAbsensi,
   updateAbsensi,
   deleteAbsensi,
   detailAbsensi,
   countAbsensi,
   getJadwalAbsensi,
   setAbsen,
};
