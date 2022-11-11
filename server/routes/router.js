const energyController = require('../controllers/controller') 

const express = require('express');
const route = express.Router();


route.get('/list/static', energyController.getDataStatic);
route.get('/list/staticvolts', energyController.getDataStaticVolts);
route.get('/list/dinamic', energyController.getDataDinamic);
route.get('/list/dinamicvolts', energyController.getDataDinamicVolts);
route.post('/create', energyController.createData);

module.exports = route;