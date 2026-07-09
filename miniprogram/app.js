const DAILY_LIMIT = 3;

function getToday() {
  const d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

App({
  globalData: {
    userInfo: null,
    testHistory: [],
    currentResult: null
  },
  onLaunch() {
    wx.cloud.init({ env: 'your-cloudbase-env-id' });

    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    const history = wx.getStorageSync('testHistory');
    if (history) {
      this.globalData.testHistory = history;
    }

    const hasSeenGuide = wx.getStorageSync('hasSeenGuide');
    if (!hasSeenGuide) {
      wx.setStorageSync('hasSeenGuide', true);
    }

    // Pull history from cloud DB in background (restore on new device)
    this.loadTestHistoryFromCloud();
  },

  // ── Cloud DB: Load history (restore on new device) ──
  async loadTestHistoryFromCloud() {
    try {
      const db = wx.cloud.database();
      const res = await db.collection('test_records')
        .orderBy('createdAt', 'desc')
        .limit(30)
        .get();
      if (res.data && res.data.length > 0) {
        const cloudHistory = res.data.map(r => ({
          type: r.type,
          name: r.name,
          dims: r.dims,
          date: r.date,
          source: r.source,
          _id: r._id
        }));
        // Merge: cloud records + local records, deduplicate, keep newest 30
        const existing = this.globalData.testHistory || [];
        const merged = [...cloudHistory];
        for (const item of existing) {
          if (!merged.some(m => m.type === item.type && m.date === item.date && m.source === item.source)) {
            merged.push(item);
          }
        }
        merged.sort((a, b) => {
          const da = new Date(a.date.replace(/\//g, '-'));
          const db = new Date(b.date.replace(/\//g, '-'));
          return db - da;
        });
        const final = merged.slice(0, 30);
        this.globalData.testHistory = final;
        wx.setStorageSync('testHistory', final);
      }
    } catch (e) {
      console.log('[app] cloud history load skipped:', e.message);
    }
  },

  // ── Cloud DB: Save single history entry ──
  async syncTestHistoryToCloud(entry) {
    try {
      const db = wx.cloud.database();
      const res = await db.collection('test_records').add({
        data: {
          ...entry,
          createdAt: Date.now()
        }
      });
      return res._id;
    } catch (e) {
      console.log('[app] cloud history save skipped:', e.message);
      return '';
    }
  },

  async deleteTestHistoryFromCloud(cloudId) {
    if (!cloudId || typeof cloudId !== 'string') return;
    try {
      const db = wx.cloud.database();
      await db.collection('test_records').doc(cloudId).remove();
    } catch (e) {
      console.log('[app] cloud history delete skipped:', e.message);
    }
  },

  // Daily AI chat limit
  getDailyChatCount() {
    const today = getToday();
    const stored = wx.getStorageSync('dailyChat') || { date: today, count: 0 };
    if (stored.date !== today) {
      return { used: 0, remaining: DAILY_LIMIT };
    }
    return {
      used: stored.count,
      remaining: Math.max(0, DAILY_LIMIT - stored.count)
    };
  },

  incrementDailyChatCount() {
    const today = getToday();
    const stored = wx.getStorageSync('dailyChat') || { date: today, count: 0 };
    if (stored.date !== today) {
      wx.setStorageSync('dailyChat', { date: today, count: 1 });
      return { used: 1, remaining: DAILY_LIMIT - 1 };
    }
    const count = stored.count + 1;
    wx.setStorageSync('dailyChat', { date: today, count });
    return {
      used: count,
      remaining: Math.max(0, DAILY_LIMIT - count)
    };
  }
});
