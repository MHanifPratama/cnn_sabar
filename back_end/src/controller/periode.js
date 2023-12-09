const {Periode} = require('../models')


const getAllPeriode= async (req, res) => {
    try {
       const data = await Periode.findAll();
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

const createNewPeriode = async (req, res) => {
   const {body} = req;
   try{
      if (!body.nama_periode){
         return res.status(400).json({
            message: "Bad Request",
            data: [],
         });
      }
      const data = await Periode.create({
         nama_periode: body.nama_periode
      });
      return res.json({
         message: "Success",
         data: data,
      });
   }
   catch (error) {
      return res.json({
         message: "Server Error",
         error: error,
      });
   }
};

const updatePeriode = async (req, res) => {
   try {
      const {id} = req.params;
      const {body} = req;
      console.log(body);
      await Periode.update(
         {
            nama_periode: body.nama_periode,
         },
         {
            where: {
               id: id,
            },
         }
      ).then(function (result) {
         if (result == 0) {
            return res.json({
               message: "Data not found",
               data: [],
            });
         }
         else {
            return res.json({
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

const deletePeriode = async (req, res) =>{
   try {
      const {id} = req.params;
      await Periode.destroy({
         where: {
            id: id,
         },
      }).then(function (result) {
         if (result == 0) {
            return res.json({
               message: "Data not found",
               data: [],
            });
         } else {
            return res.json({
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

}

const detailPeriode = async(req,res) => {
   try {
      const {id} = req.params;
      const data = await Periode.findOne({
         where: {
            id: id,
         },
      });
      if (!data){
         return res.json({
            message: "Data not found",
            data: [],
         });
      } else {
         return res.json({
            message: "Success",
            data: data,
         });
      }
   } catch (error) {
      return res.json({
         message: "Server Error",
         error: error,
      });
   }

}

module.exports = {
    getAllPeriode,
    createNewPeriode,
    updatePeriode,
    deletePeriode,
    detailPeriode
}