var express = require('express');
var router = express.Router();
var emas = require('../controllers/EmasController.js');


router.get('/', emas.list);

// Get single employee by id
router.get('/show/:id', emas.show);

// Create employee
router.get('/create', emas.create);

// Save employee
router.post('/save', emas.save);

module.exports = router;