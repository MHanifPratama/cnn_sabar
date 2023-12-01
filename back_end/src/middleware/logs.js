const logRequest = (req,res,next) => {
    console.log("Incoming request ",req.path, "Type ",req.method);
    next();
}

module.exports = logRequest;