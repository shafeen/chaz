const express = require('express');
const router = express.Router();

// protected /api routes
// ---------------------
module.exports = function (settings) {

    router.get('/test', (req, res) => {
        res.json({
            message: 'responded via test protected api endpoint'
        })
    });

    router.get('/ping', (req, res) => {
        res.status(200).send('pong!');
    });

    router.use('/user', require('./protected/user')(settings));

    return router;
};
