//用户注册路由执行函数模块
//导入mysql数据库
const db = require('../MySQL/mysql');

//导入密匙
const secretKey = require('../jwtkey/jwtkey');
//导入jsonwebtoken获取用户加密身份的token值
const jwt = require('jsonwebtoken');

//用户登录路由模块回调函数
exports.lodin_handler = (req, res) => {
    let { student_number, password, isTeacher } = req.body;
    //验证通过后先访问数据库，查询是否有此用户
    const sql_student = 'select * from user_students where student_number=?';
    const sql_teacher = 'select * from user_teacher where username=?';
    if (!isTeacher) { //登录的用户是学生
        db.query(sql_student, student_number, (err, results) => {
            if (err) return res.cc(err);
            if (results.length < 1) return res.cc('用户不存在');
            if (results.length == 1 && results[0].password !== password) return res.cc('用户密码错误');
            res.send({
                status: 0,
                msg: '登陆成功',
                data: {
                    users: {...results[0], password: '' },
                    // 尽量不保存敏感信息，因此只有用户名等，没有密码。
                    token: 'Bearer ' + jwt.sign({...results[0], password: '' }, secretKey.jwtkey, { expiresIn: '10h' })
                }
            })
        })
    } else { //登录的用户是老师
        db.query(sql_teacher, student_number, (err, results) => {
            if (err) return res.cc(err);
            if (results.length < 1) return res.cc('用户不存在');
            if (results.length == 1 && results[0].password !== password) return res.cc('用户密码错误');
            res.send({
                status: 0,
                msg: '登陆成功',
                data: {
                    users: {...results[0], password: '' },
                    // 尽量不保存敏感信息，因此只有用户名等，没有密码。
                    token: 'Bearer ' + jwt.sign({...results[0], password: '' }, secretKey.jwtkey, { expiresIn: '10h' })
                }
            })
        })
    }
};

//用户修改密码路由模块回调函数
exports.update_handler = (req, res) => {
    //通过token与表单验证后对用户的密码进行查验
    const { id, isTeacher, oldPassword, newPassword } = req.body;
    const sql_old_teacher = 'select password from user_teacher where id=?';
    const sql_old_student = 'select password from user_students where id=?';
    const sql_teacher = 'update user_teacher set password=? where id=?';
    const sql_student = 'update user_students set password=? where id=?';
    if (isTeacher === '0') { //老师用户
        db.query(sql_old_teacher, id, (err, result) => {
            if (err) return res.cc(err);
            if (result.length < 1) return res.cc('用户不存在');
            if (result[0].password == oldPassword) { //旧密码查验成功后修改密码
                db.query(sql_teacher, [newPassword, id], (errs, results) => {
                    if (errs) return res.cc(errs);
                    if (results.affectedRows !== 1) return res.cc('修改失败，稍后再试');
                    res.send({
                        status: 0,
                        msg: '修改成功'
                    })
                })
            } else {
                res.cc('原密码错误');
            }
        })
    } else { //学生用户
        db.query(sql_old_student, id, (err, result) => {
            if (err) return res.cc(err);
            if (result.length < 1) return res.cc('用户不存在');
            if (result[0].password == oldPassword) { //旧密码查验成功后修改密码
                db.query(sql_student, [newPassword, id], (errs, results) => {
                    if (errs) return res.cc(errs);
                    if (results.affectedRows !== 1) return res.cc('修改失败，稍后再试');
                    res.send({
                        status: 0,
                        msg: '修改成功'
                    })
                })
            } else {
                res.cc('原密码错误')
            }
        })
    }
};