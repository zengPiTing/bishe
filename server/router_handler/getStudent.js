//放置老师获取学生信息路由的回调 

//导入数据库模块
const db = require('../MySQL/mysql')

exports.getStudents_handler = (req, res) => {
    const sql = 'select * from user_students where daoshi_id =?';
    db.query(sql, req.body.daoshi_id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length < 1) return res.cc('暂无学生');
        res.send({
            status: 0,
            msg: '请求成功',
            data: results
        })
    })
}