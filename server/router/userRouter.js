//用户注册路由首页
const express = require('express');
const userRouter = express.Router();

//导入表单验证规则及验证表单数据验证
const { joi_user } = require('../input_joi/userRouter');
const express_joi = require('@escook/express-joi');

//导入登录路由方法模块
const { lodin_handler } = require('../router_handler/userRouter');
//用户登录路由
userRouter.post('/login', express_joi(joi_user), lodin_handler);


module.exports = userRouter;