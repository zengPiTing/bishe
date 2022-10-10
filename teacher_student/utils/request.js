//封装发送请求的request函数
import config from './config';

export default (url, method = "GET", data = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method: method,
      data,
      header: {
        Authorization: wx.getStorageSync('cookie') ? wx.getStorageSync('cookie') : ''
      },
      success: (res) => { //成功的回调
        if (data.islogin) { //如果是登录请求成功则将返回的cookie存入本地
          res.data.status === 0 ? wx.setStorageSync('cookie', res.data.data.token) : '';
        }
        resolve(res.data);
      },
      fail: (err) => { //失败的回调
        reject(err)
      }
    })
  })
}