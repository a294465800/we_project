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
