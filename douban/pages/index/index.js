//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    movie: null
  },
  //事件处理函数
  bindViewTap: function () {
  },
  onLoad: function () {
    this.loadMovie();
  },
  loadMovie() {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    });
    let thispage = this;
    wx.request({
      url: 'http://api.douban.com/v2/movie/in_theaters',
      method: 'GET',
      header: { 'content-type': 'json' },
      success: function (res) {
        let subject = res.data.subjects;
        thispage.setData({ movie: subject });
        thispage.setData({
          imgUrls: [
            res.data.subjects[0].images.large,
            res.data.subjects[1].images.large,
            res.data.subjects[2].images.large
          ]
        });
        wx.hideToast();
      }
    });
  }
})
