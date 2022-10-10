import request from '../../utils/request'

Page({
  data: {
    isShow: 'teacher', //决定是加载导师匹配情况还是问题反馈情况
    headNavList: [], //导航栏数据
    teacherId: 1, //当前导航栏老师id
    studentList: [], //当前老师门下的学生
    FeedbackList:[]//用户反馈内用列表
  },

  onLoad(options) {
    //调用回调获取导航栏数据
    this.getTeacherList();

    //获取初始状态老师的学生信息
    this.getstudentList();
  },

  //获取所有导师用户用作头部导航栏
  async getTeacherList() {
    const results = await request('/management/teacherList', 'GET', {});
    if (results.status == 0) {
      this.setData({
        headNavList: results.data
      })
    } else {
      wx.showToast({
        title: results.message,
        icon: 'none'
      })
    }
  },
  //获取对应老师的学生
  async getstudentList(e) {
    if (e) {
      //将当前老师id
      let daoshi_id = Number(e.currentTarget.id);
      this.setData({
        teacherId: daoshi_id
      })
    }
    //获取当前老师门下所有的学生用户信息
    const result = await request(`/management/studentList?daoshi_id=${this.data.teacherId}`, 'GET', {});
    if (result.status == 0) {
      let studentList = [];
      result.data.forEach((item) => {
        item.submit_time = this.getTime(item.submit_time); 
        studentList.push(item);
      })
      this.setData({
        studentList
      })
    } else {
      this.setData({
        studentList: []
      })
      wx.showToast({
        title: result.message,
        icon: 'none'
      })
    }
  },

  //控制加载导师匹配详情还是问题反馈
  async updateIsShow(e) {
    let id = e.currentTarget.id;
    if (id === 'teacher') {
      this.setData({
        isShow: 'teacher'
      })
    } else {
      this.setData({
        isShow: 'feedback'
      });
      const result = await request('/management/feedback','GET',{});
      if(result.status==0){
        let FeedbackList=[];
        result.data.forEach((item)=>{
          item.time=this.getTime(item.time);
          FeedbackList.push(item);
        })
        this.setData({
          FeedbackList:result.data
        })
      }else{
        wx.showToast({
          title: result.message,
          icon:'none'
        })
      }
    }
  },

  // 格式化时间回调
  getTime(value) {
    var date = new Date(parseInt(value));
    let M = date.getMonth() + 1;
    M = M < 10 ? '0' + M : M;
    let d = date.getDate();
    d = d < 10 ? '0' + d : d;
    let h = date.getHours();
    h = h < 10 ? '0' + h : h;
    let m = date.getMinutes();
    m = m < 10 ? '0' + m : m;
    return `${M}月${d}日 ${h}:${m}`;
  }
})