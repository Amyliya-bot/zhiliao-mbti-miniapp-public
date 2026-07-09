let _uid = 0;

Page({
  data: {
    tabActive: 'report',
    hasHistory: false,
    history: [],
    barsAnimate: false,
    trimmedCount: 0
  },
  onShow() {
    const app = getApp();
    const raw = app.globalData.testHistory || [];
    let trimmedCount = 0;
    if (raw.length > 30) {
      trimmedCount = raw.length - 30;
      raw.splice(30); // keep only latest 30
      app.globalData.testHistory = raw;
      wx.setStorageSync('testHistory', raw);
    }
    const history = raw.map((item, i) => ({
      ...item,
      swiped: false,
      _id: item._id || (++_uid)
    }));
    this.setData({
      hasHistory: history.length > 0,
      history,
      barsAnimate: false,
      trimmedCount
    });
    this._swipedIndex = -1;
    if (history.length > 0) {
      setTimeout(() => {
        this.setData({ barsAnimate: true });
      }, 400);
    }
  },
  goToHall() {
    wx.reLaunch({ url: '/pages/hall/hall' });
  },

  // ===== Touch / Swipe =====
  onTouchStart(e) {
    const index = e.currentTarget.dataset.index;
    this._touchStartX = e.touches[0].clientX;
    this._touchStartY = e.touches[0].clientY;
    this._touchMoved = false;
    this._touchIndex = index;
  },

  onTouchMove(e) {
    const deltaX = e.touches[0].clientX - this._touchStartX;
    const deltaY = e.touches[0].clientY - this._touchStartY;
    if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
      this._touchMoved = true;
    }
  },

  onTouchEnd(e) {
    const deltaX = e.changedTouches[0].clientX - this._touchStartX;
    const index = this._touchIndex;
    const prevSwiped = this._swipedIndex;

    if (this._touchMoved && deltaX < -40) {
      // Clear swipe left — open this item
      this._setSwiped(index, true);
    } else if (this._touchMoved && deltaX > 40) {
      // Clear swipe right — close whatever was open
      if (prevSwiped >= 0) {
        this._setSwiped(prevSwiped, false);
      }
    } else {
      // No significant horizontal movement — treat as tap
      if (prevSwiped >= 0 && prevSwiped === index) {
        // Tapping the open item closes it
        this._setSwiped(prevSwiped, false);
      } else if (prevSwiped >= 0) {
        // Another item is open — close it, then navigate
        this._setSwiped(prevSwiped, false);
        this.goToDetail(index);
      } else {
        // Nothing open — navigate to detail
        this.goToDetail(index);
      }
    }
  },

  _setSwiped(index, open) {
    if (index < 0 || index >= this.data.history.length) return;
    const prevOpen = this._swipedIndex;
    const updates = {};

    // Close previously open item if different
    if (prevOpen >= 0 && prevOpen !== index &&
        prevOpen < this.data.history.length) {
      updates[`history[${prevOpen}].swiped`] = false;
    }
    updates[`history[${index}].swiped`] = open;
    this.setData(updates);
    this._swipedIndex = open ? index : -1;
  },

  // ===== Navigation =====
  goToDetail(index) {
    const item = this.data.history[index];
    if (!item) return;
    wx.navigateTo({
      url: `/pages/detail/detail?type=${item.type}&dims=${item.dims.join(',')}&source=${item.source || ''}`
    });
  },

  // ===== Delete =====
  deleteItem(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.history[index];
    const history = this.data.history.filter((_, i) => i !== index);
    const app = getApp();
    // Persist without transient fields
    app.globalData.testHistory = history.map(({ swiped, _id, ...rest }) => rest);
    wx.setStorageSync('testHistory', app.globalData.testHistory);
    if (item && item._id) {
      app.deleteTestHistoryFromCloud(item._id);
    }
    this._swipedIndex = -1;
    this.setData({
      history: history.map(item => ({ ...item, swiped: false })),
      hasHistory: history.length > 0,
      barsAnimate: false
    });
    if (history.length > 0) {
      setTimeout(() => {
        this.setData({ barsAnimate: true });
      }, 400);
    }
  },

  switchTab(e) {
    const url = e.currentTarget.dataset.url;
    wx.reLaunch({ url });
  }
});
