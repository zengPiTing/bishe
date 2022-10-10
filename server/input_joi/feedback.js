const joi = require('joi');

const name = joi.string().min(1).required().error(new Error('姓名出现错误'))
const phone = joi.string().min(11).max(11).required().error(new Error('电话出现错误'))
const feedback_content = joi.string().min(1).required().error(new Error('内容出现错误'))
const time = joi.number().min(1).required().error(new Error('参数出现错误,稍后再试'))
exports.feedback_joi = {
    body: {
        name,
        phone,
        feedback_content,
        time
    }
}