//index.js
//获取应用实例
var app = getApp()
let timer;
let numAi = 0;
Page({
  data: {
    btnState: false,
    gameResult: '',
    winNum: 0,
    imageAiScr: '',
    imageUserScr: '/pages/images/user.png',
    srcs: [
      '/pages/images/石头.png',
      '/pages/images/剪刀.png',
      '/pages/images/布.png'
    ]
  },
  onLoad: function () {
    this.timerGo();
    let oldNum = wx.getStorageSync('winNum');
    if(oldNum != null && oldNum != ''){
      this.setData({winNum: oldNum});
    }
  },
  changeForChoose(e) {
    if(this.data.btnState){
      return ;
    }
    this.setData({ imageUserScr: this.data.srcs[e.currentTarget.id] });
    clearInterval(timer);

    let user = this.data.imageUserScr;
    let ai = this.data.imageAiScr;
    let num = this.data.winNum;
    let str = '你输了';
    if (user === '/pages/images/石头.png' && ai === '/pages/images/剪刀.png') {
      num++;
      str = '你赢了！';
      wx.setStorageSync('winNum', num);
    }
    if (user === '/pages/images/布.png' && ai === '/pages/images/石头.png') {
      num++;
      str = '你赢了！';
      wx.setStorageSync('winNum', num);
    }
    if (user === '/pages/images/剪刀.png' && ai === '/pages/images/布.png') {
      num++;
      str = '你赢了！';
      wx.setStorageSync('winNum', num);
    }
    if (user === ai) {
      str = '平局';
    }
    this.setData({
      winNum: num,
      gameResult: str,
      btnState: true
    })
  },
  timerGo() {
    timer = setInterval(this.move, 100);
  },
  move: function () {
    numAi = parseInt(Math.floor(Math.random()*3));
    this.setData({ imageAiScr: this.data.srcs[numAi] });
  },
  again() {
    if (!this.data) {
      return;
    }
    this.timerGo();
    this.setData({
      imageUserScr: '/pages/images/user.png',
      gameResult: '',
      btnState: false
    })
  }
})
