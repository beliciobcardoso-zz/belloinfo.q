'use strict'
const QuestionControllers = require('./controllers/QuestionController.js');

const express = require('express');

const route = express.Router();

route.get('/', (request, respond) => respond.render('index', { page: 'enter_room' }));
route.get('/create_pass', (request, respond) => respond.render('index', { page: 'create_pass' }));
route.get('/room', (request, respond) => respond.render('room'));

route.post('/room/:room/:question/:action', QuestionControllers.index);

module.exports = route;