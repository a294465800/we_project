# 微信小程序项目
##### [微信小程序开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/index.html?t=2017327)
-----------------
##### 从易到难
### 1.简单猜拳游戏
文件目录 [we_project/game](https://github.com/a294465800/we_project/tree/master/game)

**程序思路：**
1. 有一个定时器，循环显示剪刀石头布，这是AI的出手
2. 在下方有三个手势供玩家点击，点中其中一个，定时器结束，然后根据定义好的算法规则来判定输赢
3. 整个流程用到的数据都存放在data里面，通过列表渲染来改变数据；中间用到微信的API(setStorageSync)来保存玩家总共赢的次数，目的在于记录玩家赢的情况。
4. 有个"再来按钮"来重置游戏流程，让所有数据恢复到初始状态。

### 2.豆瓣首页模仿
文件目录 [we_project/douban](https://github.com/a294465800/we_project/tree/master/douban)

**程序思路：**
1. 用微信自带组件swiper来实现轮播图
2. 用豆瓣提供的api(这里使用的电影api)来获取最近的电影数据[【豆瓣api地址】](https://developers.douban.com/wiki/?title=api_v2)
> 获取数据用微信的request方法，只需要提供豆瓣api的url链接，就能够get到数据
3. 用setData()方法来将数据存进对应的page里面，在视图层(html)用`wx:for`来进行列表渲染
4. 在渲染过程中加一个加载提示框(微信的showToast，API)，等到数据请求并渲染完成后，结束提示框

### 3.二维码生成
文件目录[we_project/qrcode](https://github.com/a294465800/we_project/tree/master/qrcode)

**程序思路**
1. 二维码用画布(canvas),调用封装好的qrcode.js里面的方法生成；提供一个input框来获取用户输入的数据作为生成二维码方法的url参数
2. 引入qra.js(利用微信自带的`var QR = require('../../utils/qra.js');`)；在onLoad函数调用生成二维码的方法，需要获得生成的二维码的url、canvas-ID和宽高
3. 绑定事件来执行函数(本次把函数绑定在表单form里面)。

### 4.简单画布画图
文件目录[we_project/canvas](https://github.com/a294465800/we_project/tree/master/canvas)

**程序思路**
1. 页面布局是屏幕的80%左右作为画布，可描绘的部分；下方有笔头宽度选择和笔色选择，里面绑定了data数据供js操作。
2. 绘画功能实现过程：
```javascript
let ctx;
Page({
  data: {
    //全局参数，用来控制宽度和颜色
    pen: {
      lineWidth: 5,
      color: '#cc0033'
    }
  },
  onLoad: function () {
    //调用微信的画布api
    ctx = wx.createCanvasContext('myCanvas')
    
    //一下均为画布api的方法，可到官方开发手册查询
    ctx.setStrokeStyle(this.data.pen.color)
    ctx.setLineWidth(this.data.pen.lineWidth)
    ctx.setLineCap('round')
    ctx.setLineJoin('round')
  },
  touchStart(e){
    //为触摸的开始，绑定一个函数，确定画布粗细、颜色，同时找到点位置
    ctx.setStrokeStyle(this.data.pen.color)
    ctx.setLineWidth(this.data.pen.lineWidth)
    ctx.moveTo(e.touches[0].x, e.touches[0].y)
  },
  touchMove(e){
    //在按住不放的过程中，画出线条
    let x = e.touches[0].x
    let y = e.touches[0].y
    //找到线条位置
    ctx.lineTo(x, y)
    
    //上色
    ctx.stroke()
    
    //调用draw方法
    ctx.draw(true)
    
    //每次画一个点后，终点要移到下一个点，否则只能画出一个点
    ctx.moveTo(x, y)
  },
  //控制画笔属性的函数
  penSelect(e){
    this.setData({'pen.lineWidth': e.target.dataset.param})
  },
  colorSelect(e){
    this.setData({'pen.color': e.target.dataset.param})
  }
})
```
### 5.点餐效果展示
文件目录[we_project/orderfood](https://github.com/a294465800/we_project/tree/master/orderfood)
