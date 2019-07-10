const express = require('express');
const router = express.Router();

const listingFiles = require('../controllers/list');

router.get('/', listingFiles);

module.exports = router;