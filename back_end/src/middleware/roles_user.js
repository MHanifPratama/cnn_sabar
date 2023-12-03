const jwt = require('jsonwebtoken');
const User = require('../models').User;
const permission_role = (...roles) => {
    return async (req, res, next) => {
        try {
            const rolesData = await User.findOne({
                where: {
                    id: req.userData.id
                }
            });
            if (!roles.includes(rolesData.role)) {
                return res.status(401).json({
                    message: "Access Denied for role " + rolesData.role,
                    data: []
                })
            }
            next();
        }
        catch (error) {
            return res.status(500).json({
                message: "Server Error",
                error: error
            })
        }
    }
}

module.exports = {
    permission_role
}