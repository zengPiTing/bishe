const express = require('express');
const router = express.Router();

const { joi_getRecord } = require('../input_joi/record');
const express_joi = require('@escook/express-joi');

const { getRecord_handler } = require('../router_handler/getRecord')

//获取学生用户申请记录
router.get('/record', express_joi(joi_getRecord), getRecord_handler);

module.exports = router;