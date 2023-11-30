const DosenModel = require('../models/dosen')

const getAllDosen = async (req,res) =>{
    try{
        const data = await DosenModel.getAllDosenFromDB();
        res.json({
            message: "Success",
            data: data
        })
    }
    catch(error){
        res.json({
            message: "Server Error",
            error: error
        })
    }
}

const createNewDosen = async (req,res) => {
    const {body} = req;
    try{
        if(!body.nip || !body.nama || !body.email){
            res.status(400).json({
                message: "Bad Request",
                data: []
            })
        }
        const data = await DosenModel.createNewDosenFromDB(body);
        res.json({
            message: "Success",
            data: body
        })
    }
    catch(error){
        res.json({
            message: "Server Error",
            error: error
        })
    }
}

const updateDosen = async (req,res) => {
    try{
        const {id} = req.params;
        const {body} = req;
        const {rowCount} = await DosenModel.updateDosenFromDB(id, body);
        if(rowCount == 0){
            res.json({
                message: "Data not found",
                data:[]
            })
        }
        else{
            res.json({
                message: "Success",
                data: {
                    id: id,
                    ...body
                }
            })
        }
    }
    catch(error){
        res.json({
            message: "Server Error",
            error: error
        })
    }
}

const deleteDosen = (req,res) => {
    try{
        const {id} = req.params;
        const {rowCount} = DosenModel.deleteDosenFromDB(id);
        if(rowCount == 0){
            res.json({
                message: "Data not found",
                data:[]
            })
        }
        else{
            res.json({
                message: "Success",
                data: {
                    id: id
                }
            })
        }
    }
    catch(error){
        res.json({
            message: "Server Error",
            error: error
        })
    }
}

const detailDosen = async (req,res) => {
    try{
        const data = await DosenModel.detailDosenFromDB(req.params.id);
        res.json({
            message: "Success",
            data: data
        })
    }
    catch(error){
        if (error.code === 0){
            res.json({
                message: "Data not found",
                data: {}
            })
        }
        res.json({
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