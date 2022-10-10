//放置老师获取学生信息的路由

const express = require('express');
const router = express.Router();

const { getStudents_handler } = require('../router_handler/getStudent');

//获取导师学生的信息的路由
router.post('/getstudents', getStudents_handler);

module.exports = router;