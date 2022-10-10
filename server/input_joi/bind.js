//存放用户绑定信息路由模块表单验证规则
const joi = require('joi');

const id = joi.number().min(1).required().error(new Error('参数错误，稍后再试'));
const student_dorm = joi.string().pattern(/^[\u4e00-\u9fa50-9]{6,10}$/).required().error(new Error('宿舍填写有误'));
const domain = joi.string().pattern(/^[\u4e00-\u9fa5]{1,15}$/).required().error(new Error('专业填写有误'));
const school = joi.string().pattern(/^[\u4e00-\u9fa5]{1,15}$/).required().error(new Error('学院填写有误'));
const student_phone = joi.string().min(11).max(11).required().error(new Error('电话号码填写有误'))
const _class = joi.string().min(7).max(7).required().error(new Error('班级填写有误'))
const year = joi.string().min(4).max(4).required().error(new Error('入学年份填写有误'))
exports.bind_joi = {
    body: {
        student_phone,
        school,
        domain,
        _class,
        student_dorm,
        year,
        id
    }
}

exports.users_joi = {
    query: {
        id
    }
}