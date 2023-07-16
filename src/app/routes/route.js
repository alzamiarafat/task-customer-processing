'use strict';
const express = require('express');
const controller = require('../controllers');
const router = express.Router();

router.post('/customers', controller.CustomerController.store);
router.post('/customers-export', controller.CustomerController.export);

module.exports = router;