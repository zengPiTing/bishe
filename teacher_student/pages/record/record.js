var appInstance = getApp();
import request from '../../utils/request'
Page({

  data: {
    users: {}, //当前学生用户
    recordList: [], //当前用户申请记录
    isRecord: false, //表示当前是否有申请记录
    isTeacher: false, //表示当前是否已有导师
    isShow: 'teacher' //控制当前是否显示
  },

  onLoad(options) {
    let users = appInstance.globalData.users;
    this.setData({
      users
    });
    if (users.daoshi_id) {
      this.setData({
        isTeacher: true
      })
    } else {
      wx.showToast({
        title: '暂无导师',
        icon: 'none'
      })
    }
    //调用获取申请记录的回调
    this.getRecord();

  },
  //获取申请记录的回调
  async getRecord() {
    let student_id = this.data.users.id;
    const result = await request(`/record?student_id=${student_id}`, 'GET', {});
    if (result.status !== 1&&result.data) {
      let recordList = this.data.recordList;
      result.data.forEach((item) => {
        item.submit_time = this.timeHandler(item.submit_time);
        item.reject_time ? item.reject_time = this.timeHandler(item.reject_time) : item.reject_time = '';
        recordList.push(item);
      });
      this.setData({
        recordList
      });
    }
  },
  //修改当前状态
  updateStatus(e) {
    this.setData({
      isShow: e.currentTarget.id
    });
    if (e.currentTarget.id == 'teacher') {
      if (this.data.users.daoshi_id) {
        this.setData({
          isTeacher: true
        })
      } else {
        wx.showToast({
          title: '暂无导师',
          icon: 'none'
        })
      }
    } else {
      if (this.data.recordList.length > 0) {
        this.setData({
          isRecord: true
        })
      } else {
        wx.showToast({
          title: '暂无申请记录',
          icon: 'none'
        })
      }
    }
  },
  //时间转换回调
  timeHandler(value) {
    let date = new Date(parseInt(value));
    let M = date.getMonth() + 1;
    M < 10 ? ('0' + M) : M;
    let d = date.getDate();
    d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    return `${M}月${d}日  ${h}:${m}`;
  }
})