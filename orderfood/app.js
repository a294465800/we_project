//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    foodList: [
      {
        id: 1,
        title: "黑胡椒意酱粉",
        cost: 45,
        desc: "进口意大利通心粉制作，搭配有机番茄秘制酱汁。",
        icon: "https://fuss10.elemecdn.com/8/05/0b0f3719bf1c9c1673ed69e262888.jpeg",
        num: 0
      },
      {
        id: 2,
        title: "吉士意大利虾仁面",
        cost: 40,
        desc: "进口意大利通心粉制作，搭配进口地中海大虾仁。",
        icon: "https://fuss10.elemecdn.com/8/05/0b0f3719bf1c9c1673ed69e262888.jpeg",
        num: 0
      },
      {
        id: 3,
        title: "牛排意大利面",
        cost: 38,
        desc: "进口意大利通心粉制作，搭配新鲜酱汁牛排和甜糯玉米。",
        icon: "https://fuss10.elemecdn.com/8/05/0b0f3719bf1c9c1673ed69e262888.jpeg",
        num: 0
      },
      {
        id: 4,
        title: "香炸鸡翅",
        cost: 12,
        desc: "有机食品，绿色农场放心肉源",
        icon: "https://fuss10.elemecdn.com/8/05/0b0f3719bf1c9c1673ed69e262888.jpeg",
        num: 0
      },
      {
        id: 5,
        title: "一品寿司",
        cost: 22,
        desc: "百分百手工，百分百口味，来自东海岸的问候",
        icon: "https://fuss10.elemecdn.com/8/05/0b0f3719bf1c9c1673ed69e262888.jpeg",
        num: 0
      },
      {
        id: 6,
        title: "辣子鸡",
        cost: 22,
        desc: "百分百手工，百分百口味，来自东海岸的问候",
        icon: "https://fuss10.elemecdn.com/8/05/0b0f3719bf1c9c1673ed69e262888.jpeg",
        num: 0
      }
    ]
  }
})