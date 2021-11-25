const express = require('express');
const router = express.Router();
const {
    postData
} = require('../../controllers/data');

router.post(
    '/data',
    postData
    );

module.exports = router;