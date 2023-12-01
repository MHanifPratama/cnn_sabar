require('dotenv').config();
const PORT = process.env.PORT

const express = require('express');
const middlewareLog = require('./middleware/logs.js');
const middlewareValidation = require('./middleware/validation_token.js');

const dosenRoutes = require('./routes/dosen.js');
const mahasiswaRoutes = require('./routes/mahasiswa.js');
const userRoutes = require('./routes/user.js');

const app = express();
app.use(middlewareLog);


app.use(express.json());
app.use("/api/v1/user", userRoutes);

app.use(middlewareValidation);

app.use("/api/v1/dosen", dosenRoutes)
app.use("/api/v1/mahasiswa", mahasiswaRoutes)


app.use("/",(req,res)=>{
    res.json({
        message: "Hello World"
    })
})


app.listen(PORT,()=> {
    console.log("Server is running on port ",PORT);
})