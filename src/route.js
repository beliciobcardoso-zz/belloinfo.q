'use strict'
const QuestionControllers = require('./controllers/QuestionController.js');

const express = require('express');

const route = express.Router();

route.get('/', (request, respond) => respond.render('index'));
route.get('/create_pass', (request, respond) => respond.render('create_pass'));
route.get('/room', (request, respond) => respond.render('room'));

route.post('/room/:room/:question/:action', QuestionControllers.index);

module.exports = route;