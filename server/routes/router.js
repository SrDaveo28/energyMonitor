const energyController = require('../controllers/controller') 

const express = require('express');
const route = express.Router();


route.get('/list/static', energyController.getDataStatic);
route.get('/list/dinamic', energyController.getDataDinamic);
route.post('/create', energyController.createData);

module.exports = route;