import request from '../../utils/request'
//节流全局变量
let isApply = true;

Page({
  data: {
    name: '',
    phone: '',
    feedback_content: '',
  },
  onLoad(options) {

  },
  //收集表单数据
  getInput(e) {
    let index = e.currentTarget.id;
    let value = e.detail.detail.value;
    if (index == 'name') {
      this.setData({
        name: value
      })
    };
    if (index == 'phone') {
      this.setData({
        phone: value
      })
    };
    if (index == 'fellback') {
      this.setData({
        feedback_content: value
      })
    };
  },
  //提交反馈
  async getFeedback() {
    let {
      name,
      phone,
      feedback_content
    } = this.data;
    let time = Date.now();
    if (!name || !phone || !feedback_content) {
      wx.showToast({
        title: '请将信息补充完整',
        icon: 'none'
      })
    } else {
      if (isApply) {
        const result = await request('/feedback', 'POST', {
          name,
          phone,
          feedback_content,
          time
        });
        //添加节流
        isApply = false;
        setTimeout(() => {
          isApply = true;
        }, 3000);
        if (result.status == 0) {
          wx.showToast({
            title: result.msg,
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: result.message,
            icon: 'none'
          });
        }
      }
    }
  }
})