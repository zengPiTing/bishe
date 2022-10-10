// 存放获取申请记录路由的回调

const db = require('../MySQL/mysql');

//获取申请记录的回调
exports.getRecord_handler = (req, res) => {
    const sql = 'select * from record where student_id=?';
    db.query(sql, req.query.student_id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length < 1) return res.cc('暂无申请记录', 0);
        res.send({
            status: 0,
            msg: "请求成功",
            data: results
        })
    });
}