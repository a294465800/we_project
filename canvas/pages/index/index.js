//index.js
//获取应用实例
let ctx;
Page({
  data: {
    pen: {
      lineWidth: 5,
      color: '#cc0033'
    }
  },
  onLoad: function () {
    ctx = wx.createCanvasContext('myCanvas')
    ctx.setStrokeStyle(this.data.pen.color)
    ctx.setLineWidth(this.data.pen.lineWidth)
    ctx.setLineCap('round')
    ctx.setLineJoin('round')
  },
  touchStart(e){
    ctx.setStrokeStyle(this.data.pen.color)
    ctx.setLineWidth(this.data.pen.lineWidth)
    ctx.moveTo(e.touches[0].x, e.touches[0].y)
  },
  touchMove(e){
    let x = e.touches[0].x
    let y = e.touches[0].y
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.draw(true)
    //每次画一个点后，终点要移到下一个点
    ctx.moveTo(x, y)
  },
  penSelect(e){
    this.setData({'pen.lineWidth': e.target.dataset.param})
  },
  colorSelect(e){
    this.setData({'pen.color': e.target.dataset.param})
  }
})
