const energyController = require('../controllers/controller') 

const express = require('express');
const route = express.Router();


route.get('/list', energyController.getData);
route.post('/create', energyController.createData);

module.exports = route;