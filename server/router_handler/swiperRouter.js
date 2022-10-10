//swiper图片路由执行回调模块
//导入MySQL模块
const db = require('../MySQL/mysql')

exports.swiper_handler = (req, res) => {
    const sql_img = 'select * from index_img'
    const sql_daoshi = 'select * from index_daoshi where status=0'
    db.query(sql_img, (err, results) => {
        if (err) return res.cc(err);
        let indexImg = results;
        db.query(sql_daoshi, (err, results) => {
            if (err) return res.cc(err);
            let indexDaoshi = results;
            res.send({
                status: 0,
                msg: '请求成功',
                data: {
                    indexImg,
                    indexDaoshi
                }
            })
        })
    })
}