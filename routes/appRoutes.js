const express = require('express');
const AppController = require('../controllers/AppController');

const appRouter = express.Router();

appRouter.get('/', AppController.getStatus);

module.exports = appRouter;
