const express = require('express');
const router = express.Router();

const { getTeacherList_handler, getStudentList_handler, getFeedbackList_handler } = require('../router_handler/management');

//管理获取导师用户列表路由
router.get('/teacherList', getTeacherList_handler);

//管理获取导师门下学生列表路由
router.get('/studentList', getStudentList_handler);

//管理获取用户反馈信息路由
router.get('/feedback', getFeedbackList_handler);

module.exports = router;