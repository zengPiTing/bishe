//反馈意见路由的回调函数

const db = require('../MySQL/mysql')

exports.setFeedback_handler = (req, res) => {
    const sql = 'insert into feedback set?';
    db.query(sql, req.body, (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('提交出错，稍后再试');
        res.send({
            status: 0,
            msg: '提交成功'
        })
    })
}