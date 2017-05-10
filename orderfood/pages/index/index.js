//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    //picker
    foodTypes: ['全部菜品', '披萨', '面条', '水果', '寿司', '三明治'],
    foodTypesIndex: 0,
    rankTypes: ['综合排序', '热度', '价格', '好评', '时间'],
    rankTypesIndex: 0,
    foodList: [],
    orderNum: 0,
    orderCost: 0,
    orderList: {}
  },
  onLoad: function () {
    let originData = app.globalData.foodList;
    this.setData({ foodList: originData })
  },
  foodTypeChange(e) {
    this.setData({ foodTypesIndex: e.detail.value });
  },
  rankTypeChange(e) {
    this.setData({ rankTypesIndex: e.detail.value });
  },
  //增加购物车
  addToCart: function (e) {
    var dataset = e.currentTarget.dataset;
    wx.showToast({
      icon: "success",
      title: "已添加",
      duration: 1000
    })
    this.changeNum(dataset.index, true);
  },
  //减少
  reduceFromCart: function (e) {
    var dataset = e.currentTarget.dataset;
    wx.showToast({
      icon: "success",
      title: '已删除',
      duration: 1000
    })
    this.changeNum(dataset.index, false)
  },
  changeNum: function (index, bool) {
    let t_food = this.data.foodList[index];
    let orderList = this.data.orderList;
    let obj = orderList[t_food.id]
    let that = this
    //如果存在，则数量变化
    if (obj) {
      if (bool) {
        obj.num = obj.num + 1;
      } else {
        if (obj.num > 0) {
          obj.num = obj.num - 1;
        } else {
          orderList[t_food.id] = null;
          return ;
        }
      }
    } else {
      if (bool) {
        //不存在，点击增加，则写入一条数据，数量默认为1
        obj = {
          id: t_food.id,
          num: 1,
          cost: t_food.cost,
          title: t_food.title
        }
        orderList[t_food.id] = obj
      } else {
        return;
      }
    }

    var order_num = 0
    var order_cost = 0
    for (let k in orderList) {
      order_num = orderList[k].num + order_num;
      order_cost = order_cost + orderList[k].cost * orderList[k].num
    }
    t_food.num = obj.num;
    let foodList = this.data.foodList
    foodList[index] = t_food
    this.setData({
      oderList: orderList,
      orderNum: order_num,
      orderCost: order_cost,
      foodList: foodList
    })
  }
})
