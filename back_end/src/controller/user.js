const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req,res) =>{
    try{
        const secret_key = process.env.JWT_SECRET_KEY;
        const expires_in = 60 * 60 * 1;
        const {body} = req;
        const user = await User.findOne({
            where: {
                email: body.email
            }
        })
        if(!user){
            return res.status(400).json({
                message: "Invalid Login",
                data: []
            })
        }
        if(!user.password){
            return res.status(400).json({
                message: "Password is not set",
                data: []
            })
        }
        const isValidPassword = await bcrypt.compare(body.password, user.password);
        if(!isValidPassword){
            return res.status(400).json({
                message: "Invalid Login",
                data: []
            })
        }
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(payload, secret_key, {expiresIn: expires_in});
        return res.json({
            message: "Success Login",
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token: "Bearer " + token,
        })
    }
    catch(error){
        return res.json({
            message: "Server Error",
            error: error
        })
    }
}

const registerUser = async (req,res) => {
    try{
        const {body} = req;
        const hashPassword = await bcrypt.hash(body.password, 10);
        const data = await User.create({
            username: body.username,
            email: body.email,
            password: hashPassword,
            role:'non_admin',
        })
        res.json({
            message: "Success Created",
        })
    }
    catch(error){
        res.json({
            message: "Server Error",
            error: error
        })
    }
}




module.exports = {
    loginUser,
    registerUser
}