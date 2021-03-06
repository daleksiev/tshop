const route = require('../routes');
const express = require('express');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(route);
}