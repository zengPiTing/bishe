//修改用户密码的路由模块

const express = require('express');
const updateRouter = express.Router();

//导入表单验证规则及验证表单数据验证
const { joi_update } = require('../input_joi/userRouter');
const express_joi = require('@escook/express-joi');

//导入登录路由方法模块
const { update_handler } = require('../router_handler/userRouter');
//用户修改密码路由
updateRouter.post('/update', express_joi(joi_update), update_handler);

module.exports = updateRouter;