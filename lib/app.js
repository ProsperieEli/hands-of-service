const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());
app.use('/api/v1/games', require('./controllers/games'));
app.use('/api/v1/animals', require('./controllers/animals'));
app.use('/api/v1/foods', require('./controllers/foods'));
app.use('/api/v1/movies', require('./controllers/movies'));
// App routes

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
