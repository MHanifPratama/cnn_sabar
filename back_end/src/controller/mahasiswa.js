const {Mahasiswa} = require('../models');

const getAllMahasiswa = async (req,res) =>{
    try{
        const data = await Mahasiswa.findAll();
        return res.json({
            message: "Success",
            data: data
        })
    }
    catch(error){
        return res.json({
            message: "Server Error",
            error: error
        })
    }
}

const createNewMahasiswa = async (req,res) => {
    const {body} = req;
    try{
        if(!body.nip || !body.nama || !body.email){
            return res.status(400).json({
                message: "Bad Request",
                data: []
            })
        }
        const data = await Mahasiswa.create({
            npm: body.nip,
            nama_mahasiswa: body.nama,
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

const updateMahasiswa = async (req,res) => {
    try{
        const {id} = req.params;
        const {body} = req;
        await Mahasiswa.update({
            nip: body.nip,
            nama_mahasiswa: body.nama,
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

const deleteMahasiswa = async (req,res) => {
    try{
        const {id} = req.params;
        await Mahasiswa.destroy({
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

const detailMahasiswa = async (req,res) => {
    try{
        await Mahasiswa.findOne({
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
    getAllMahasiswa,
    createNewMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
    detailMahasiswa
}