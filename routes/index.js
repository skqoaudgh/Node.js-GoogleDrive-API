const express = require('express');
const router = express.Router();

const listController = require('../controllers/list');
const getFileName = require('../middleware/getFileName');

router.get('/', listController.listFile);
router.get('/:name', listController.detailFile);
router.get('/:id/:name', getFileName, listController.downloadFile);
router.post('/', listController.searchFile);

module.exports = router;