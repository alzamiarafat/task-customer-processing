'use strict';
const route = require('./route');

module.exports = function (app) {
    app.use('/api', route);
};
