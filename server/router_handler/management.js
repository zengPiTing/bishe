//导入数据库
const db = require('../MySQL/mysql')


//管理获取导师用户列表路由回调函数
exports.getTeacherList_handler = (req, res) => {
    const sql = 'select id,nickname from user_teacher';
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        if (result.length < 1) return res.cc('暂无老师用户');
        res.send({
            status: 0,
            msg: '请求成功',
            data: result
        })
    })
};

//管理获取导师对应学生用户信息路由回调函数
exports.getStudentList_handler = (req, res) => {
    const sql = 'select * from user_students where daoshi_id=?';
    db.query(sql, req.query.daoshi_id, (err, result) => {
        if (err) return res.cc(err);
        if (result.length < 1) return res.cc('当前老师暂无学生');
        let result1 = [];
        result.forEach((item) => {
            item.password = ''
            result1.push(item);
        })
        res.send({
            status: 0,
            masg: '获取成功',
            data: result1
        })
    })
};

//管理获取用户反馈信息路由回调函数
exports.getFeedbackList_handler = (req, res) => {
    const sql = 'select * from feedback';
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        if (result.length < 1) return res.cc('暂无用户反馈');
        res.send({
            status: 0,
            msg: '请求成功',
            data: result
        })
    })
}