//用户注册路由首页
const express = require('express');
const swiperRouter = express.Router();

//导入路由方法模块
const { swiper_handler } = require('../router_handler/swiperRouter');

//用户注册路由
swiperRouter.get('/swiper', swiper_handler);

module.exports = swiperRouter;