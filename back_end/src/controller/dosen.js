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

const createNewDosen = (req,res) => {
    console.log(req.body);
    res.json({
        message: "Create New Dosen"
    })
}

const updateDosen = (req,res) => {
    console.log(req.params.id);
    res.json({
        message: "Update Dosen"
    })
}

const deleteDosen = (req,res) => {
    console.log(req.params.id);
    res.json({
        message: "Delete Dosen"
    })
}

module.exports = {
    getAllDosen,
    createNewDosen,
    updateDosen,
    deleteDosen
}