//导入request函数
import request from '../../utils/request'

//引入全局app实例获取数据
var appInstance = getApp();

Page({
  data: {
    swiper_list: [], //用于存放swiper图
    title_daoshi: {}, //用于存放老师风向标数据
    students: [], //用于存放学生风采数据
    isCookies: false, //用于判断是否登录状态
    isTeacher: false, //判断当前用户是老师还是学生用户
    users:{}//当前登录用户信息
  },
  onLoad() {
    wx.showToast({
      "title": '目前仅支持智能科学与工程学院师生使用',
      "icon": "none"
    })
    //获取页面数据
    this.index_request('/api/swiper');
    //同步登录状态
    let users = appInstance.globalData.users;
    let cookie = wx.getStorageSync('cookie');
    if (cookie && users.id) {
      this.setData({
        isCookies: true,
        users
      })
    }
    //判断是老师还是学生用户
    if (users.isTeacher === 0) {
      this.setData({
        isTeacher: true
      })
    } else if (users.isTeacher === 1) {
      this.setData({
        isTeacher: false
      })
    }
  },
  //请求index数据的回调函数
  async index_request(url, method, data = {}) {
    let result = await request(url, method, data);
    let text = result.data.indexDaoshi;
    let text0 = [];
    let text1 = [];
    let text2 = [];
    let text3 = [];
    text.forEach((value, index, arr) => {
      value.class === 1 && text1.length < 8 ? text1.push(value) : ''
      value.class === 0 && text0.length < 8 ? text0.push(value) : ''
      value.class === 2 && text2.length < 8 ? text2.push(value) : ''
      value.class === 3 && text3.length < 8 ? text3.push(value) : ''
    });
    let swiper_list = result.data.indexImg.filter((value, index) => value.img_class === 0)
    let students = result.data.indexImg.filter((value, index) => value.img_class === 2)
    this.setData({
      swiper_list,
      students,
      title_daoshi: {
        title_jiaoshou: {
          title: '教授',
          content: text1
        },
        title_fujiaoshou: {
          title: '副教授',
          content: text0
        },
        title_boshi: {
          title: '博士',
          content: text2
        },
        title_jiangshi: {
          title: '讲师及其他',
          content: text3
        },
      }
    })
  },
  //登录跳转的回调
  go_login() {
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
  //密码修改跳转页面
  goUpdate() {
    wx.navigateTo({
      url: '/pages/password/password',
    })
  },
  //导师展示跳转页面
  goShow(){
    wx.reLaunch({
      url:'/pages/show/show'
    })
  },
  //意向填报跳转页面
  goChoice(){
    if(this.data.users.school){
      wx.navigateTo({
        url: '/pages/choice/choice',
      })
    }else{
      wx.showToast({
        title: '请先补充用户信息',
        icon:'none'
      })
    }
    
  },
  //我的学生/导师跳转页面
  goRecord(){
    if(this.data.isTeacher){
      wx.reLaunch({
        url: '/pages/userInfo/userInfo',
      })
    }else{
      wx.navigateTo({
        url: '/pages/record/record',
      })
    }
  }

})