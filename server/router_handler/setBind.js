//用户绑定信息路由回调
const db = require('../MySQL/mysql');

//用户绑定身份路由回调函数
exports.bindUsers_handler = (req, res) => {
    //表单验证通过后将数据添加到数据库中
    const {
        student_phone,
        school,
        domain,
        _class,
        student_dorm,
        year,
        id
    } = req.body;
    let users = { student_phone, school, domain, _class, student_dorm, year, }
    const sql = 'update user_students set? where id=?';
    db.query(sql, [users, id], (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('绑定失败，请稍后再试');
        res.send({
            status: 0,
            msg: '绑定成功'
        })
    })
};

//用户获取自身信息路由回调函数
exports.getUsers_handler = (req, res) => {
    console.log(req.query);
    const sql = 'select * from user_students where id=?';
    db.query(sql, req.query.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.length != 1) return res.cc('请求失败，稍后再试');
        result[0].password = ''
        res.send({
            status: 0,
            msg: '请求成功',
            data: result
        })
    })
}