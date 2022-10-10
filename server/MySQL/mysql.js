//导入MySQL模块
const mysql = require('mysql');
//建立与MySQL数据库的连接
const db = mysql.createPool({
    //四个必须的属性
    host: '127.0.0.1', //数据库的IP地址
    user: 'root', //登录数据库的账号，一般默认为root
    password: 'admin123', //登录数据库的密码
    database: '02_daoshi' //操作数据库的名称
});

module.exports = db