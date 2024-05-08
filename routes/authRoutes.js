const express = require('express');
const { loginRules, registerRules } = require('../models/validation/auth');
const validatorMiddleware = require('../middleware/validator');
const AuthController = require('../controllers/AuthController');

const authRouter = express.Router();

authRouter.post('/login', [loginRules, validatorMiddleware, AuthController.login]);
authRouter.post('/register', [registerRules, validatorMiddleware, AuthController.register]);

module.exports = authRouter;
