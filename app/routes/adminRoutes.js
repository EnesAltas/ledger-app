const express = require('express');
const checkPermission = require('../middleware/checkPermission');
const AdminController = require('../controllers/AdminController');

const adminRouter = express.Router();

adminRouter.get('/get-users-balance', [checkPermission, AdminController.getAllUsersBalance]);
adminRouter.get('/get-user-balance/:id', [checkPermission, AdminController.getUserBalanceById]);
adminRouter.put('/add-credit/:id', [checkPermission, AdminController.addBalanceToUser]);
adminRouter.post('/get-balance-at-time', [checkPermission, AdminController.getBalanceAtTime]);

module.exports = adminRouter;
