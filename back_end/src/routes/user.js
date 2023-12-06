const express = require('express');
const UserController = require('../controller/user.js');
const routes = express.Router();

routes.post("/login", UserController.loginUser);
routes.post("/register", UserController.registerUser);


module.exports = routes;