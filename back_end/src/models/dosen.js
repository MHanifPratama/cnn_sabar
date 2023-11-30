const db = require('../config/database.js');

const getAllDosenFromDB = ()=>{
    const query = "SELECT * FROM dosen"
    return db.any(query);
}

module.exports = {
    getAllDosenFromDB
}