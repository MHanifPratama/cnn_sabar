const {Dosen} = require('../models');

const getAllDosen = async (req,res) =>{
    try{
        const data = await Dosen.findAll();
        console.log(data);
        return res.json({
            message: "Success",
            data: data
        })
    }
    catch(error){
        console.log(error);
        return res.json({
            message: "Server Error",
            error: error
        })
    }
}

const createNewDosen = async (req,res) => {
    const {body} = req;
    console.log(body);
    try{
        if(!body.nip || !body.nama || !body.email){
            return res.status(400).json({
                message: "Bad Request",
                data: []
            })
        }
        const data = await Dosen.create({
            nip: body.nip,
            nama_dosen: body.nama,
            email: body.email
        })
        return res.json({
            message: "Success",
            data: body
        })
    }
    catch(error){
        return res.json({
            message: "Server Error",
            error: error
        })
    }
}

const updateDosen = async (req,res) => {
    try{
        const {id} = req.params;
        const {body} = req;
        await Dosen.update({
            nip: body.nip,
            nama_dosen: body.nama,
            email: body.email
        },{
            where: {
                id: id
            }
        
        }).then(function (result) {
            if(result == 0){
                return res.json({
                    message: "Data not found",
                    data: []
                })
            }
            else{
                return res.json({
                    message: "Success",
                    data: body
                })
            }
          });
    }
    catch(error){
        return res.json({
            message: "Server Error",
            error: error
        })
    }
}

const deleteDosen = async (req,res) => {
    try{
        const {id} = req.params;
        await Dosen.destroy({
            where: {
                id: id
            }
        }).then(function (result) {
            if(result == 0){
                return res.json({
                    message: "Data not found",
                    data: []
                })
            }
            else{
                return res.json({
                    message: "Success",
                    data: []
                })
            }
          });
    }
    catch(error){
        return res.json({
            message: "Server Error",
            error: error
        })
    }
}

const detailDosen = async (req,res) => {
    try{
        await Dosen.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            if(result == null){
                return res.json({
                    message: "Data not found",
                    data: {}
                })
            }
            else{
                return res.json({
                    message: "Success",
                    data: result
                })
            }
          });
    }
    catch(error){
        if (error.code === 0){
            return res.json({
                message: "Data not found",
                data: {}
            })
        }
        return res.json({
            message: "Server Error",
            error: error
        })
    }
}

module.exports = {
    getAllDosen,
    createNewDosen,
    updateDosen,
    deleteDosen,
    detailDosen
}