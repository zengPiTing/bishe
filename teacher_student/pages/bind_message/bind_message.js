var appInstance = getApp();
import request from '../../utils/request'

Page({

  data: {
    users: {}, //登录用户信息
    //储存表单数据
    student_phone: '',
    school: '',
    domain: '',
    _class: '',
    student_dorm: '',
    year: ''

  },

  onLoad(options) {
    //获取用户登录情况
    const users = appInstance.globalData.users;
    if (users) {
      this.setData({
        users
      })
    }
  },
  //收集表单数据
  getInput(e) {
    let index = e.currentTarget.id;
    let value = e.detail.detail.value;
    if (index == 'student_phone') {
      this.setData({
        student_phone: value
      })
    }
    if (index == 'school') {
      this.setData({
        school: value
      })
    }
    if (index == 'domain') {
      this.setData({
        domain: value
      })
    }
    if (index == '_class') {
      this.setData({
        _class: value
      })
    }
    if (index == 'student_dorm') {
      this.setData({
        student_dorm: value
      })
    }
    if (index == 'year') {
      this.setData({
        year: value
      })
    }
  },
  //绑定用户信息
  async setUsers() {

    let {
      student_phone,
      school,
      domain,
      _class,
      student_dorm,
      year
    } = this.data;
    let id = this.data.users.id;
    if (!student_phone || !school || !domain || !_class || !student_dorm || !year) {
      wx.showToast({
        title: '请将信息填完整',
        icon: 'none'
      })
    } else {
      const result = await request('/bind/list', 'POST', {
        student_phone,
        school,
        domain,
        _class,
        student_dorm,
        year,
        id
      });
      if (result.status !== 1) {
        wx.showToast({
          title: '绑定成功',
        });
        // 此处需要重新获取信息并储存进全局appdata中
        const results = await request(`/bind/users?id=${this.data.users.id}`, 'GET', {});
        if (results.status == 0) {
          appInstance.globalData.users = results.data[0]
        }
        wx.reLaunch({
          url: '/pages/user/user'
        });
      } else {
        wx.showToast({
          title: result.message,
          icon: 'none'
        })
      }
    }
  }
});