const jwt = require('jsonwebtoken');
const validation_token = (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.json({
            message: "Token is required"
        })
    }
    const token = authorization.split(" ")[1];
    const secret_key = process.env.JWT_SECRET_KEY;
    try{
        const decoded = jwt.verify(token, secret_key);
        req.userData = decoded
    }
    catch(error){
        return res.json({
            message: "Invalid Token"
        })
    }
    next();
}

module.exports = validation_token;