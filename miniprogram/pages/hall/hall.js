let _uid = 0;

Page({
  data: {
    tabActive: 'hall',
    hasHistory: false,
    recentReports: [],
    dotAnim: false,
    pencilAnim: false,
    limitToast: false,
    dailyRemaining: 3,
    showRules: false,
    rulesClosing: false
  },
  onShow() {
    const app = getApp();
    const { remaining } = app.getDailyChatCount();
    this.setData({ dailyRemaining: remaining });

    const raw = app.globalData.testHistory || [];
    if (raw.length > 30) {
      raw.splice(30);
      app.globalData.testHistory = raw;
      wx.setStorageSync('testHistory', raw);
    }
    const recentReports = raw.map((item) => ({
      ...item,
      swiped: false,
      _id: item._id || (++_uid)
    }));
    this.setData({
      hasHistory: recentReports.length > 0,
      recentReports,
      dotAnim: false,
      pencilAnim: false
    });
    this._swipedIndex = -1;
    // Trigger icon animations after render
    setTimeout(() => {
      this.setData({ dotAnim: true, pencilAnim: true });
    }, 300);
  },

  goToChat() {
    const app = getApp();
    const { remaining } = app.getDailyChatCount();
    if (remaining <= 0) {
      this.setData({ limitToast: true });
      setTimeout(() => {
        this.setData({ limitToast: false });
      }, 3000);
      return;
    }
    wx.navigateTo({ url: '/pages/chat/chat' });
  },
  showRules() {
    this.setData({ showRules: true, rulesClosing: false });
  },
  hideRules() {
    this.setData({ rulesClosing: true });
    setTimeout(() => {
      this.setData({ showRules: false, rulesClosing: false });
    }, 350);
  },
  goToQuiz() {
    wx.navigateTo({ url: '/pages/quiz-select/quiz-select' });
  },

  // ===== Recent Reports Touch / Swipe =====
  onRecentTouchStart(e) {
    const index = e.currentTarget.dataset.index;
    this._touchStartX = e.touches[0].clientX;
    this._touchStartY = e.touches[0].clientY;
    this._touchMoved = false;
    this._touchIndex = index;
  },

  onRecentTouchMove(e) {
    const deltaX = e.touches[0].clientX - this._touchStartX;
    const deltaY = e.touches[0].clientY - this._touchStartY;
    if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
      this._touchMoved = true;
    }
  },

  onRecentTouchEnd(e) {
    const deltaX = e.changedTouches[0].clientX - this._touchStartX;
    const index = this._touchIndex;
    const prevSwiped = this._swipedIndex;

    if (this._touchMoved && deltaX < -40) {
      this._setRecentSwiped(index, true);
    } else if (this._touchMoved && deltaX > 40) {
      if (prevSwiped >= 0) {
        this._setRecentSwiped(prevSwiped, false);
      }
    } else {
      // Tap — close open item, no navigation (display only)
      if (prevSwiped >= 0) {
        this._setRecentSwiped(prevSwiped, false);
      }
    }
  },

  _setRecentSwiped(index, open) {
    if (index < 0 || index >= this.data.recentReports.length) return;
    const prevOpen = this._swipedIndex;
    const updates = {};

    if (prevOpen >= 0 && prevOpen !== index &&
        prevOpen < this.data.recentReports.length) {
      updates[`recentReports[${prevOpen}].swiped`] = false;
    }
    updates[`recentReports[${index}].swiped`] = open;
    this.setData(updates);
    this._swipedIndex = open ? index : -1;
  },

  deleteRecent(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.recentReports[index];
    const recentReports = this.data.recentReports.filter((_, i) => i !== index);
    const app = getApp();
    app.globalData.testHistory = recentReports.map(({ swiped, _id, ...rest }) => rest);
    wx.setStorageSync('testHistory', app.globalData.testHistory);
    if (item && item._id) {
      app.deleteTestHistoryFromCloud(item._id);
    }
    this._swipedIndex = -1;
    this.setData({
      recentReports: recentReports.map(item => ({ ...item, swiped: false })),
      hasHistory: recentReports.length > 0
    });
  },

  switchTab(e) {
    const url = e.currentTarget.dataset.url;
    wx.reLaunch({ url });
  }
});
