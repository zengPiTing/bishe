const express = require('express');
const choiceRouter = express.Router();

//导入joi验证规则及expressJoi包自动验证
const { joi_choice, joi_studentList, joi_choiseApply } = require('../input_joi/choice');
const expressJoi = require('@escook/express-joi');


//导入路由回调函数
const { setChoice_handler, getChoiceStudentList_handler, setChoiseApply_handler } = require('../router_handler/setChoice');

//用户填报导师意向路由
choiceRouter.post('/mentor', expressJoi(joi_choice), setChoice_handler);
//老师用户获取学生申请信息路由
choiceRouter.post('/list', expressJoi(joi_studentList), getChoiceStudentList_handler);
//老师用户审阅学生申请信息路由
choiceRouter.post('/isapply', expressJoi(joi_choiseApply), setChoiseApply_handler);

module.exports = choiceRouter;