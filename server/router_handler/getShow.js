//存放导师展示页面路由的回调函数

//导入数据库模块
const db = require('../MySQL/mysql');

//获取学院分类标题路由的回调函数
exports.getShowTitle = (req, res) => {
    const sql = 'select * from show_title'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        if (results.length < 1) return res.cc('请求失败，稍后再试');
        res.send({
            status: 0,
            msg: '请求成功',
            data: results
        })
    })
};

//获取对应分类的导师数据路由的回调函数
exports.getShowUsers = (req, res) => {
    let domain_id = req.body.domain_id;
    const sql = 'select * from user_teacher where domain_id=?';
    db.query(sql, domain_id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length < 1) return res.cc('当前专业暂无老师');
        //将老师数据中密码清空
        let data = [];
        results.forEach(item => {
            item.password = '';
            data.push(item);
        });
        res.send({
            status: 0,
            msg: '请求成功',
            data
        })
    })
}