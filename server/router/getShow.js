//存放获取导师展示页面的路由
const express = require('express');
const showRouter = express.Router();

//导入检验表单数据express-joi
const expressJoi = require('@escook/express-joi');
const { joi_showUsers } = require('../input_joi/userRouter');

//导入导师展示页面路由的回调函数
const { getShowTitle, getShowUsers } = require('../router_handler/getShow')

//获取导师所属专业标题的路由
showRouter.get('/title', getShowTitle);
//获取导师信息的路由
showRouter.post('/showUsers', expressJoi(joi_showUsers), getShowUsers);

module.exports = showRouter;