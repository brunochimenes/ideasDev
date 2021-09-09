const express = require('express');
const routes = express.Router();

const AnnotationController = require('./controllers/AnnotationController');
const LikeController = require('./controllers/LikeController');

routes.get('/annotations', AnnotationController.index);
routes.post('/annotations', AnnotationController.store);

routes.post('/likes/:id', LikeController.store);

module.exports = routes;