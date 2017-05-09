//index.js
//获取应用实例
var QR = require('../../utils/qra.js');
Page({
  data: {
    placeholder: 'http://ruanmou.net'
  },
  onLoad: function (options) {
    let size = this.setCanvasSize();
    let url = this.data.placeholder;
    this.createQRcode(url, 'mycanvas', size.w, size.h);
  },
  createQRcode(url, canvasID, canvasWidth, canvasHeight) {
    QR.qrApi.draw(url, canvasID, canvasWidth, canvasHeight);
  },
  setCanvasSize() {
    let size = {};
    let res = wx.getSystemInfoSync();
    let scale = 686 / 750;
    let width = res.windowWidth * scale;
    let height = width;
    size.w = width;
    size.h = height;
    return size;
  },
  formSubmit(e) {
    console.log(e);
    let url = e.detail.value.url || this.data.placeholder;
    wx.showToast({
      title: '生成中，不急',
      icon: 'loading',
      duration: 2000
    })
    let that = this
    let timer = setTimeout(()=>{
      let size = that.setCanvasSize();
      that.createQRcode(url, 'mycanvas', size.w, size.h);
      wx.hideToast()
      clearTimeout(timer)
    },2000)
  }
})
