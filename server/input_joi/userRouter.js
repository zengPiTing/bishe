//表单验证规则模块
const joi = require('joi');


//用户登录模块
//字符串、字母和数字组成、最小为一位、最大为15位、必须携带
const student_number = joi.string().alphanum().min(6).max(9).required().error(new Error('用户名有误'));
// 字符串、满足正则表达式，不能有空格，6~12位、必须携带
const password = joi.string().alphanum().pattern(/^[\S]{6,15}$/).required().error(new Error('密码有误'));
const isTeacher = joi.required();
exports.joi_user = {
    //检验body携带的数据
    body: {
        student_number,
        password,
        isTeacher
    }
};

//用户修改密码模块
const id = joi.number().min(1).required();
exports.joi_update = {
    body: {
        id,
        isTeacher,
        oldPassword: password,
        //joi.ref('oldPwd')表示和旧密码相同,oldPwd为默认写法不可更改，joi.not()表示取反，concat()表示加上password规则
        newPassword: joi.not(joi.ref('oldPassword')).concat(password).error(new Error('新密码与原密码相同'))
    }
}

//用户获取对应专业老师信息模块
exports.joi_showUsers = {
    body: {
        domain_id: id
    }
}