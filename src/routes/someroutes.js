// Route (endpoint) definitions go in this directory
const express = require('express');
const coinRoute = express.Router();
const flip_middleware = require('../middleware/mymiddleware');
coinRoute.get('/', flip_middleware.status);
coinRoute.post('/flip/coins/', flip_middleware.multiple_coins);
coinRoute.get('/flip/', flip_middleware.coin_flip);
coinRoute.get('/flips/:number', flip_middleware.number_coin_flip);
coinRoute.post('/flip/call/', flip_middleware.flip_call);
coinRoute.get('/flip/heads', flip_middleware.head_call);
coinRoute.get('/flip/call/tails', flip_middleware.tails_call);
coinRoute.get('/flip/call/:guess(heads|tails)/', flip_middleware.guess_flip);
module.exports = coinRoute;