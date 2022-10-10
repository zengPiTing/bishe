const express = require('express');
const router = express.Router();

const { feedback_joi } = require('../input_joi/feedback');
const express_joi = require('@escook/express-joi');

const { setFeedback_handler } = require('../router_handler/setFeedback');

//上传意见反馈路由
router.post('/feedback', express_joi(feedback_joi), setFeedback_handler);

module.exports = router;