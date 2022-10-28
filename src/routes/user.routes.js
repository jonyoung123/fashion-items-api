const userRoutes = require('express').Router();
const userControllerImport = require('../controllers/user.controller');
const usercontroller = new userControllerImport();
userRoutes.post('/signup', (req, res) => usercontroller.registerUser(req, res));
userRoutes.post('/login', (req, res) => usercontroller.loginUser(req, res));

module.exports = userRoutes;