Page({
  data: {
    cur: 0,
    showPrivacy: false
  },
  onLoad() {
    const agreed = wx.getStorageSync('privacyAgreed');
    if (!agreed) {
      this.setData({ showPrivacy: true });
    }
  },
  agreePrivacy() {
    try {
      wx.setStorageSync('privacyAgreed', true);
      this.setData({ showPrivacy: false });
    } catch (e) {
      wx.showToast({ title: '保存失败，请重试', icon: 'none' });
    }
  },
  declinePrivacy() {
    wx.showModal({
      title: '提示',
      content: '同意隐私政策后才能使用知聊的所有功能。',
      confirmText: '重新选择',
      cancelText: '退出小程序',
      success: (res) => {
        if (!res.confirm) {
          wx.exitMiniProgram();
        }
      }
    });
  },
  openPrivacy() {
    wx.navigateTo({ url: '/pages/privacy/privacy' });
  },
  onSwiperChange(e) {
    this.setData({ cur: e.detail.current });
  },
  goToSlide(e) {
    const i = e.currentTarget.dataset.i;
    this.setData({ cur: i });
  },
  goToHall() {
    wx.reLaunch({
      url: '/pages/hall/hall'
    });
  }
});
