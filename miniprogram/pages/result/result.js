const { generateShareCard } = require('../../utils/share-card');
const { TYPE_DATA } = require('../../data/mbti-data');

Page({
  data: {
    resultType: '',
    resultName: '',
    resultDesc: '',
    impression: '',
    pE: 0, pI: 0, pS: 0, pN: 0, pT: 0, pF: 0, pJ: 0, pP: 0,
    barI: 0, barE: 0, barN: 0, barS: 0,
    barT: 0, barF: 0, barJ: 0, barP: 0,
    borderlineEI: false, borderlineSN: false,
    borderlineTF: false, borderlineJP: false,
    showSharePreview: false,
    shareImagePath: ''
  },
  onLoad() {
    const result = getApp().globalData.currentResult;
    if (!result) {
      wx.showToast({ title: '数据丢失，请重新测试', icon: 'none', duration: 2000 });
      setTimeout(() => { wx.reLaunch({ url: '/pages/hall/hall' }); }, 2000);
      return;
    }
    this.setData({ ...result });
    const bars = [
      { barI: result.pI, barE: result.pE },
      { barN: result.pN, barS: result.pS },
      { barT: result.pT, barF: result.pF },
      { barJ: result.pJ, barP: result.pP }
    ];
    bars.forEach((pair, i) => {
      setTimeout(() => { this.setData(pair); }, 500 + i * 140);
    });
  },
  goToDetail() {
    const dims = [
      Math.max(this.data.pI, this.data.pE),
      Math.max(this.data.pN, this.data.pS),
      Math.max(this.data.pF, this.data.pT),
      Math.max(this.data.pJ, this.data.pP)
    ].join(',');
    const pcts = [
      this.data.pE, this.data.pI,
      this.data.pS, this.data.pN,
      this.data.pT, this.data.pF,
      this.data.pJ, this.data.pP
    ].join(',');
    wx.navigateTo({
      url: `/pages/fullreport/fullreport?type=${this.data.resultType}&dims=${dims}&pcts=${pcts}`
    });
  },

  _getGroupName(typeCode) {
    const info = TYPE_DATA[typeCode];
    return info ? info.groupName : '';
  },

  _buildShareData() {
    return {
      typeCode: this.data.resultType,
      typeName: this.data.resultName,
      resultDesc: this.data.resultDesc,
      groupName: this._getGroupName(this.data.resultType),
      impression: this.data.impression,
      dimensions: [
        { leftLetter: 'I', rightLetter: 'E', leftPct: this.data.pI, rightPct: this.data.pE },
        { leftLetter: 'N', rightLetter: 'S', leftPct: this.data.pN, rightPct: this.data.pS },
        { leftLetter: 'T', rightLetter: 'F', leftPct: this.data.pT, rightPct: this.data.pF },
        { leftLetter: 'J', rightLetter: 'P', leftPct: this.data.pJ, rightPct: this.data.pP }
      ]
    };
  },

  async shareResult() {
    wx.showLoading({ title: '生成中...' });
    try {
      const data = this._buildShareData();
      const tempPath = await generateShareCard(this, data, '#shareCanvas', 'result');
      wx.hideLoading();
      this.setData({ shareImagePath: tempPath, showSharePreview: true });
    } catch (e) {
      wx.hideLoading();
      console.error('Share card generation failed:', e);
      wx.showToast({ title: '生成失败，请重试', icon: 'none' });
    }
  },

  closeSharePreview() {
    this.setData({ showSharePreview: false, shareImagePath: '' });
  },

  async saveShareImage() {
    try {
      await new Promise((resolve, reject) => {
        wx.saveImageToPhotosAlbum({
          filePath: this.data.shareImagePath,
          success: resolve,
          fail: reject
        });
      });
      wx.showToast({ title: '已保存到相册', icon: 'success' });
      this.closeSharePreview();
    } catch (e) {
      if (e.errMsg && e.errMsg.includes('auth deny')) {
        wx.showModal({
          title: '需要授权',
          content: '请允许保存图片到相册',
          confirmText: '去设置',
          success: (res) => { if (res.confirm) wx.openSetting(); }
        });
      } else {
        wx.showToast({ title: '保存失败', icon: 'none' });
      }
    }
  },

  onShareAppMessage() {
    return {
      title: `我的MBTI人格：${this.data.resultType} "${this.data.resultName}"`,
      path: '/pages/guide/guide'
    };
  },

  goHome() {
    wx.reLaunch({ url: '/pages/hall/hall' });
  },

  noop() {}
});
