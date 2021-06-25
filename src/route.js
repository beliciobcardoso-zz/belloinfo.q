'use strict'
const express = require('express');
const QuestionControllers = require('./controllers/QuestionController.js');
const RoomControllers = require('./controllers/RoomController');

const route = express.Router();

route.get('/', (request, respond) => respond.render('index', { page: 'enter_room' }));
route.get('/create_pass', (request, respond) => respond.render('index', { page: 'create_pass' }));
route.get('/room/:room', (request, respond) => respond.render('room'));

route.post('/question/:room/:question/:action', QuestionControllers.index);
route.post('/create_room', RoomControllers.create);

module.exports = route;