Page({
  data: {
    tabActive: 'mine',
    testCount: 0,
    lastType: '-',
    shareCount: 0
  },
  onShow() {
    const app = getApp();
    const history = app.globalData.testHistory || [];
    const shareCount = wx.getStorageSync('shareCount') || 0;
    this.setData({
      testCount: history.length,
      lastType: history.length > 0 ? history[0].type : '-',
      shareCount
    });
  },
  goToReport() {
    wx.reLaunch({ url: '/pages/report/report' });
  },
  onShareAppMessage() {
    const count = (wx.getStorageSync('shareCount') || 0) + 1;
    wx.setStorageSync('shareCount', count);
    this.setData({ shareCount: count });
    return {
      title: '知聊 · MBTI 对话测试 — 用 AI 读懂你的性格',
      path: '/pages/guide/guide'
    };
  },
  settings() {
    wx.openSetting();
  },
  openPrivacy() {
    wx.navigateTo({ url: '/pages/privacy/privacy' });
  },
  switchTab(e) {
    const url = e.currentTarget.dataset.url;
    wx.reLaunch({ url });
  }
});
