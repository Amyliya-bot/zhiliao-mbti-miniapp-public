Page({
  goBack() {
    wx.navigateBack({
      fail: () => wx.reLaunch({ url: '/pages/hall/hall' })
    });
  }
});
