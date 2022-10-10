import request from '../../utils/request'

//引入全局app实例获取数据
var appInstance = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:false,
    usersInfo: {}, //用户数据
    first_nickname:'民大',//头像数据
    studentList:[]//导师门下的学生
  },

  onLoad(options) {
    let users = appInstance.globalData.users;
    if (users.id) {
      if (users.isTeacher === 0) { //老师用户
        this.setData({
          usersInfo:users,
          first_nickname: users.nickname.slice(0, 1),
          status:true
        });
        //老师登陆后发送请求获取老师门下所有学生数据
        this.getStudent(users.id);
      }else{
        this.setData({
          usersInfo:users,
          first_nickname: users.nickname.slice(0, 1),
          status:false
        })
      }
    } else {
      this.setData({
        usersInfo: {
          school:'未登录',
          nickname:'未登录',
          student_number:'未登录',
          domain:'未登录',
          _class:'未登录',
          daoshi_name:'未登录',
          year:'未登录'
        }
      })
    }

  },

  //发送请求获取老师门下所有学生数据的回调
  async getStudent(id){
    const results = await request('/teacher/getstudents','post',{daoshi_id:id});
    if(results.status===0){
      this.setData({
        studentList:results.data
      })
    }
  }
})