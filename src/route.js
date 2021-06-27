'use strict'
const express = require('express');
const QuestionController = require('./controllers/QuestionController');
const RoomController = require('./controllers/RoomController');

const route = express.Router();

route.get('/', (request, response) => response.render('index', { page: 'enter_room' }));
route.get('/create_pass', (request, response) => response.render('index', { page: 'create_pass' }));

route.post('/create_room', RoomController.create);
route.get('/room/:room', RoomController.open);
route.post('/enterroom', RoomController.enter);

route.post('/question/create/:room', QuestionController.create);
route.post('/question/:room/:question/:action', QuestionController.index);

module.exports = route;