const db = require('../config/database.js');

const getAllDosenFromDB = ()=>{
    const query = "SELECT * FROM dosen"
    return db.any(query);
}

const createNewDosenFromDB = (body)=>{
    const query = "INSERT INTO dosen (nip,nama_dosen,email) VALUES ('"+body.nip+"','"+body.nama+"','"+body.email+"')"
    console.log(query);
    return db.none(query);
}

const detailDosenFromDB = (id)=>{
    const query = "SELECT * FROM dosen WHERE id = '"+id+"'"
    return db.any(query);
}

const updateDosenFromDB = (id,body)=>{
    const query = "UPDATE dosen SET nip = '"+body.nip+"', nama_dosen = '"+body.nama+"', email = '"+body.email+"' WHERE id = '"+id+"'"
    console.log(query);
    return db.result(query);
    
}

const deleteDosenFromDB = (id)=>{
    const query = "DELETE FROM dosen WHERE id = '"+id+"'"
    return db.result(query);
}

module.exports = {
    getAllDosenFromDB,
    createNewDosenFromDB,
    detailDosenFromDB,
    updateDosenFromDB,
    deleteDosenFromDB
}