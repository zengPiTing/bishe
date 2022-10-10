const joi = require('joi');

const student_id = joi.number().min(1).required().error(new Error('参数出错，稍后再试'));
exports.joi_getRecord = {
    query: {
        student_id
    }
}