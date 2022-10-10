//引入全局app实例获取数据
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailUsers: {}, //存放导师详细信息
    users: {} //存放当前登录用户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取导师详细信息
    let detailUsers = JSON.parse(options.users);
    if(detailUsers.education){
      let result = detailUsers.education.split('；');
      detailUsers.education = result;
      if (detailUsers) {
        this.setData({
          detailUsers,
        })
      };
    }
    //从全局app获取当前用户登录情况
    const users = appInstance.globalData.users;
    this.setData({
      users
    })
  },

  // 跳转至选导师界面
  goOptions() {
    if (this.data.users.school) {
      wx.reLaunch({
        url: `/pages/choice/choice?name=${this.data.detailUsers.nickname}`,
      })
    }else{
      wx.showToast({
        title: '请先补充信息',
        icon:'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})