const express = require('express');
const router = express.Router();

const listController = require('../controllers/list');

router.get('/', listController.listFile);
router.get('/:id/:name', listController.downloadFile);

module.exports = router;