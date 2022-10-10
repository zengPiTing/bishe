const express = require('express');
const router = express.Router();

//导入joi验证表单数据
const { bind_joi, users_joi } = require('../input_joi/bind');
const express_joi = require('@escook/express-joi');

//导入补充信息路由回调函数
const { bindUsers_handler, getUsers_handler } = require('../router_handler/setBind');

//用户补充信息路由
router.post('/list', express_joi(bind_joi), bindUsers_handler);

//用户获取自身信息路由
router.get('/users', express_joi(users_joi), getUsers_handler);

module.exports = router;