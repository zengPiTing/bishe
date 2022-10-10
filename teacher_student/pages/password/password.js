//导入app实例
const appInstance = getApp();

import request from '../../utils/request'

Page({

  data: {
    users: {}, //用户身份信息
    oldPassword: '', //表单收集的旧密码
    newPassword: '', //表单收集的新密码
    is_oldPassword: false, //旧密码是否显示是否正确
    is_newPassword: false, //新密码是否显示是否正确
    hint_oldPassword: '', //旧密码提示语
    hint_newPassword: '', //新密码提示语
    isShow: false, //控制提示语是否显示
    isRequest: true //控制发送请求
  },

  onLoad(options) {
    if (appInstance.globalData.users.id) {
      this.setData({
        users: appInstance.globalData.users
      })
    }
  },

  //收集表单数据
  getInput(e) {
    let id = e.currentTarget.id;
    let value = e.detail.value;
    if (id === 'old') {
      this.setData({
        oldPassword: value
      })
    } else if (id === 'new') {
      this.setData({
        newPassword: value
      })
    }
  },

  //登录的回调
  async getUpdate() {
    this.setData({
      isShow: true
    })
    let passwordJoi = /^[A-Za-z0-9]{6,15}$/;
    let {
      oldPassword,
      newPassword
    } = this.data;
    //表单验证
    if (!oldPassword || !passwordJoi.test(oldPassword)) {
      if (!newPassword || !passwordJoi.test(newPassword)) {
        this.setData({
          is_oldPassword: false,
          is_newPassword: false,
          hint_oldPassword: '原密码有误，请输入6~15位数字字母密码',
          hint_newPassword: '新密码有误，请输入6~15位数字字母密码'
        })
      } else {
        this.setData({
          is_oldPassword: false,
          is_newPassword: true,
          hint_oldPassword: '原密码有误，请输入6~15位数字字母密码',
          hint_newPassword: '输入正确'
        })
      }
    } else {
      if (!newPassword || !passwordJoi.test(newPassword)) {
        this.setData({
          is_oldPassword: true,
          is_newPassword: false,
          hint_oldPassword: '输入正确',
          hint_newPassword: '新密码有误，请输入6~15位数字字母密码'
        })
      } else {
        this.setData({
          is_oldPassword: true,
          is_newPassword: true,
          hint_oldPassword: '输入正确',
          hint_newPassword: '输入正确'
        })
        //表单数据验证通过之后发起请求修改密码
        if (this.data.isRequest) {
          let {
            users,
            oldPassword,
            newPassword
          } = this.data
          const result = await request('/update', 'POST', {
            id: users.id,
            isTeacher: users.isTeacher,
            oldPassword,
            newPassword
          });
          if (result) {
            this.setData({ //控制节流
              isRequest: false
            });
            setTimeout(() => {
              this.setData({
                isRequest: true
              })
            }, 3000);
            if (result.status === 0) {
              wx.showToast({
                title: result.msg,
              });
              wx.reLaunch({
                url:'/pages/index/index'
              })
            } else {
              wx.showToast({
                title: result.message,
                icon: 'none'
              })
            }
          }
        }
      }
    }
  }
})