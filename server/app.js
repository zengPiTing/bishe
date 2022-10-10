//服务器核心文件
const express = require('express');
//创建服务器实例
const app = express();

//导入并配置cors中间件解决跨域问题
const cors = require('cors'); //导入中间件
app.use(cors()); //注册为全局中间件

//导入joi方便检查出表单错误
const Joi = require('joi');


// 通过如下的代码，配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件：
app.use(express.urlencoded({ extended: false }));
//导入并配置解析body数据的中间件
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//注册err中间件，简化路由err时代码书写量
app.use((req, res, next) => {
    res.cc = (msg, status = 1) => {
        res.send({
            status,
            message: msg instanceof Error ? msg.message : msg
        });
    }
    next();
});

//在路由模块之前定义expressJWT中间件检验用户token
//导入密匙
const secretKey = require('./jwtkey/jwtkey');
const { expressjwt } = require('express-jwt');
app.use(expressjwt({
    secret: secretKey.jwtkey,
    algorithms: ["HS256"]
}).unless({ path: [/^\/api\//] }));

//导入用户登录路由模块
const userRouter = require('./router/userRouter');
app.use('/api', userRouter);
//导入首页数据路由模块
const swiperRouter = require('./router/swiperRouter');
app.use('/api', swiperRouter);
//导入注册老师获取用户信息路由模块
const getStudentRouter = require('./router/getStudent');
app.use('/teacher', getStudentRouter);
//导入注册用户修改密码路由模块
const updateRouter = require('./router/update');
app.use(updateRouter);
//导入注册导师展示页面数据路由模块
const showRouter = require('./router/getShow');
app.use('/api', showRouter);
//导入注册提交用户意向导师路由模块
const choiceRouter = require('./router/setChoice');
app.use('/choice', choiceRouter);
//导入注册获取用户申请记录路由模块
const recordRouter = require('./router/getRecord');
app.use(recordRouter);
//导入注册学生用户补充信息路由模块
const bindRouter = require('./router/setBind');
app.use('/bind', bindRouter);
//导入注册用户提交反馈信息路由模块
const feedbackRouter = require('./router/setFeedback');
app.use(feedbackRouter);
//导入管理员获取数据路由模块
const managementRouter = require('./router/management');
app.use('/management', managementRouter);

// 配置全局错误中间件,捕获请求过程中的错误
app.use((err, req, res, next) => {
    //验证表单数据出现错误
    if (err instanceof Joi.ValidationError) return res.cc(err);
    //token验证出错
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败');
    // 未知错误
    res.cc(err);
    next();
})

//启动服务器
app.listen(1104, () => {
    console.log('http://127.0.0.1:1104');
});