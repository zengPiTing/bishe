//引入全局app实例获取数据
var appInstance = getApp();

Page({
  data: {
    users: {}, //从全局app拿到的用户数据
    nickname: '未登录', //默认用户名
    first_nickname: '未登录', //默认用户头像
    school: '智能科学与工程', //默认用户学院
    isTeacher: 1, //默认不是老师
    isManager: 1, //默认不是管理
  },

  onLoad(options) {
    let result = appInstance.globalData.users;
    //从全局app实例中获取用户数据存入
    if (result.id) {
      this.setData({
        users: result,
        nickname: result.nickname,
        first_nickname: result.nickname.slice(0, 1),
        school: result.school,
        isTeacher: result.isTeacher,
        isManager: result.isManager
      })
    }
  },
  //未登陆时去登陆界面
  gologin() {
    if (!this.data.users.id) {
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
  },

  //跳转至身份详情页面
  gouserInfo() {
    if (this.data.users.isTeacher === 1 && !this.data.users.school) {
      wx.showToast({
        title: '请先完成信息绑定',
        icon:'none'
      })
    } else {
      wx.navigateTo({
        url: `/pages/userInfo/userInfo?users=${this.data.users}`,
      })
    }
  },

  //下方跳转至下一功能区
  gonext(e) {
    let Topath = e.currentTarget.id;
    if (!this.data.users.id) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      switch (true) {
        case Topath === 'xinxi':
          wx.navigateTo({
            url: '/pages/bind_message/bind_message',
          })
          break;
        case Topath === 'mima':
          wx.navigateTo({
            url: '/pages/password/password',
          })
          break;
        case Topath === 'fankui':
          wx.navigateTo({
            url: '/pages/feedback/feedback',
          })
          break;
        case Topath === 'fenxiang':
          wx.navigateTo({
            url: '/pages/share/share',
          })
          break;
          default:
            if (this.data.isManager !== 0) {
              wx.showToast({
                title: '暂无权限访问',
                icon: 'none'
              })
              break;
            } else {
              wx.navigateTo({
                url: '/pages/management/management',
              })
              break;
            }
      }
    }
  }
})