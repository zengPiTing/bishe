//引入全局app实例获取数据
var appInstance = getApp();

import request from '../../utils/request'

Page({
  data: {
    choice_teacher: '', //意向老师
    comment: '好好学习，天天向上', //存储老师寄语
    users: {}, //存储当前用户信息
    choiceStudentList: [] //存储选取当前老师用户的学生申请
  },

  onLoad(options) {
    //获取学生点击跳转携带的意向导师
    if (options.name) {
      this.setData({
        choice_teacher: options.name
      })
    }
    //获取当前登录用户信息
    if (appInstance.globalData.users) {
      this.setData({
        users: appInstance.globalData.users
      })
    }
    //发起请求获取当前老师用户的学生申请信息
    if (this.data.users.isTeacher == 0) {
      this.getChoiceStudentList();
    }
  },

  //获取学生申请的回调
  async getChoiceStudentList() {
    const result = await request('/choice/list', 'POST', {
      is_choice: this.data.users.nickname
    })
    if (result.status !== 0) {
      wx.showToast({
        title: result.message,
      })
    } else {
      this.setData({
        choiceStudentList: result.data
      });
    }
  },

  //获取学生用户input内容
  getInput(e) {
    this.setData({
      choice_teacher: e.detail.value
    })
  },

  //学生用户提交导师意向申请的回调
  async setChoise() {
    let submit_time = Date.now();
    let choice_teacher = this.data.choice_teacher
    let teacherJoi = /^[\u4e00-\u9fa5]{0,10}$/;
    if (!choice_teacher || teacherJoi.test(choice_teacher) === false) {
      wx.showToast({
        title: '导师未填写或者填写不规范',
        icon: 'none'
      })
    } else if (this.data.users.daoshi_id) {
      wx.showToast({
        title: '已有导师，请勿重复选择',
        icon: 'none'
      })
    } else if (this.data.users.is_choice) {
      wx.showToast({
        title: '已有申请在审核中，请勿重复提交',
        icon: 'none'
      })
    } else {
      const results = await request('/choice/mentor', 'POST', {
        daoshi_name: choice_teacher,
        id: this.data.users.id,
        submit_time,
        student_name: this.data.users.nickname
      });
      if (results.status == 0) {
        wx.showToast({
          title: results.msg,
        })
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.showToast({
          title: results.message,
          icon: 'none'
        })
      }
    }
  },

  //获取老师用户input内容
  getInputContent(e) {
    this.setData({
      comment: e.detail.value
    })
  },

  //老师用户提交学生申请的回调
  setChoiseApply(e) {
    wx.showModal({
      title: '是否确定提交',
      content: '一旦驳回或者同意将不可更改',
      success: async (res) => {
        if (res.confirm) { //用户点击了确定
          //当前申请的学生用户id
          let id = e.currentTarget.dataset.id
          //当前老师用户id
          let daoshi_id = this.data.users.id
          // 当前是同意还是驳回
          let is_yes = e.currentTarget.id;
          //老师给学生的寄语
          let comment = this.data.comment;
          //老师的姓名
          let daoshi_name = this.data.users.nickname;
          //当前提交的时间
          let reject_time = Date.now();
          //学生提交的时间
          let submit_time = e.currentTarget.dataset.time;
          const result = await request('/choice/isapply', 'POST', {
            is_yes,
            comment,
            id,
            daoshi_id,
            daoshi_name,
            reject_time,
            submit_time
          });
          if (result.status == 0) {
            wx.showToast({
              title: result.msg,
            });
          }
        }
      }
    })
  }
})