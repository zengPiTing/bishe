// pages/share/share.js
Page({

  data: {

  },
  onLoad(options) {

  },

  onShareAppMessage({from}) {
    console.log(from);//判断用户使用什么方式分享页面，
    if(from==='menu'){
      return{
        title:"分享给朋友",//转发的标题
        path:"/pages/index/index",//转发的路径
        imageUrl:"/static/image/img/gogogo.jpeg"//转发默认图片
      }
    }
  }
})