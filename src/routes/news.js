const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

//route custom
router.get('/:slug', newsController.show);

// route default
router.get('/', newsController.index);

module.exports = router;
