import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_yes_no: { //用于判断当前用户输入数据是否正确
      is_student: {
        isshow: false,
        yes_no: false,
        hint: ''
      },
      is_password: {
        isshow: false,
        yes_no: false,
        hint: ''
      }
    },
    student_number: '', //用户学号
    password: '', //用户密码
    isBtn: true, //控制3秒才能发送一次请求
    isTeacher: false, //判断用户是否是老师
  },

  onLoad(options) {

  },

  //用于收集输入框表单数据
  getInputContent(e) {
    let id = e.currentTarget.dataset.id;
    let value = e.detail.value
    if (id === "studentNumber") {
      this.setData({
        student_number: value
      })
    }
    if (e.currentTarget.dataset.id === "password") {
      this.setData({
        password: e.detail.value
      })
    }
  },

  //用于收集checker复选框的
  checkChange(e) {
    let {
      isTeacher
    } = this.data;
    this.setData({
      isTeacher: !isTeacher
    });
  },

  //登录回调
  async getLogin() {
    let {
      isTeacher
    } = this.data;
    let password_joi = /^[A-Za-z0-9]{6,15}$/;
    let student_number_joi = /^[A-Za-z0-9]{6,9}$/;
    let {
      password,
      student_number
    } = this.data;
    //验证表单数据
    if (!student_number) {
      if (!password) {
        this.setDatafn(true, false, '密码为空', true, false, '账号为空');
      } else if (password && !password_joi.test(password)) {
        this.setDatafn(true, false, '填写不规范，请使用6至15位数字字母密码', true, false, '账号为空');
      } else {
        this.setDatafn(true, true, '填写正确', true, false, '账号为空');
      }
    } else if (student_number && !student_number_joi.test(student_number)) {
      if (!password) {
        this.setDatafn(true, false, '密码为空', true, false, '填写不规范，请使用6至9位数字字母账号');
      } else if (password && !password_joi.test(password)) {
        this.setDatafn(true, false, '填写不规范，请使用6至15位数字字母密码', true, false, '填写不规范，请使用6至9位数字字母账号');
      } else {
        this.setDatafn(true, true, '填写正确', true, false, '填写不规范，请使用6至9位数字字母账号');
      }
    } else {
      if (!password) {
        this.setDatafn(true, false, '密码为空', true, true, '填写正确');
      } else if (password && !password_joi.test(password)) {
        this.setDatafn(true, false, '填写不规范，请使用6至15位数字字母密码', true, true, '填写正确');
      } else {
        this.setDatafn(true, true, '填写正确', true, true, '填写正确');
        let result;
        //发送请求登录
        if (this.data.isBtn) {
          result = await request('/api/login', 'POST', {
            password,
            student_number,
            isTeacher,
            islogin: true
          });
        }
        if (result) {
          //让请求回来之后让三秒禁止连续请求
          this.setData({
            isBtn: false
          })
          setTimeout(() => {
            this.setData({
              isBtn: true
            });
          }, 3000);
        }
        if (result && result.status == 1) {
          wx.showToast({
            title: result.message,
            icon: 'none'
          });
        } else if (result && result.status === 0) {
          //获取全局app实例，将数据存入
          const appInstance = getApp();
          appInstance.globalData.users = result.data.users;
          //返回至首页
          wx.switchTab({
            url: `/pages/index/index`
          })
        }
      }
    }
  },

  //登录模块更新data数据回调
  setDatafn(password_isshow, password_yes_no, password_hint, student_isshow, student_yes_no, student_hint) {
    this.setData({
      is_yes_no: {
        is_student: {
          isshow: student_isshow,
          yes_no: student_yes_no,
          hint: student_hint
        },
        is_password: {
          isshow: password_isshow,
          yes_no: password_yes_no,
          hint: password_hint
        }
      }
    })
  }
})