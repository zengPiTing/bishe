import request from '../../utils/request'

Page({
  data: {
    showTitle: [], //存放导师展示页面分类标题数据
    domain_id: 1, //存放专业分类的id
    teacherUsers: [] //存放导师信息
  },

  onLoad(options) {
    //获取页面标题分类数据
    this.getTeacherUsers('/api/title');
    this.getShowUsers(this.data.domain_id);
  },

  //获取导师数据回调函数
  async getTeacherUsers(url) {
    const result = await request(url);
    if (result) {
      this.setData({
        showTitle: result.data
      })
    }
  },

  //点击标题获取对应老师数据
  getShowUsers_handler(e) {
    let domain_id = e.currentTarget.id;
    this.setData({
      domain_id
    });
    this.getShowUsers(domain_id);
  },

  //获取导师信息的回调
  async getShowUsers(domain_id) {
    //获取对应专业的老师信息
    const result = await request('/api/showUsers', 'POST', {
      domain_id
    });
    if (result.status == 0) {
      this.setData({
        teacherUsers: result.data
      })
    } else {
      this.setData({
        teacherUsers: []
      })
      wx.showToast({
        title: result.message,
        icon: 'none'
      })
    }
  },

  //跳转至详情页
  goDetail(e) {
    let index = e.currentTarget.id;
    let detailUsers = this.data.teacherUsers[index];
    wx.navigateTo({
      url: `/pages/detail/detail?users=${JSON.stringify(detailUsers)}`,
    })
  }

})