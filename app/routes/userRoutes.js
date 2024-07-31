const express = require('express');
const checkUserLoggedIn = require('../middleware/checkUserLoggedIn');
const { transferRules } = require('../models/validation/user');
const validatorMiddleware = require('../middleware/validator');
const UserController = require('../controllers/UserController');

const userRouter = express.Router();

userRouter.get('/', [checkUserLoggedIn, UserController.getBalance]);
userRouter.post('/transfer', [transferRules, validatorMiddleware, checkUserLoggedIn, UserController.transfer]);

module.exports = userRouter;
