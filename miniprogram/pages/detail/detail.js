const { TYPE_DATA } = require('../../data/mbti-data');
const { generateShareCard } = require('../../utils/share-card');

const DIM_DEFS = [
  { left: 'I', right: 'E', label: '内向(I) / 外向(E)' },
  { left: 'N', right: 'S', label: '直觉(N) / 实感(S)' },
  { left: 'T', right: 'F', label: '思考(T) / 情感(F)' },
  { left: 'J', right: 'P', label: '判断(J) / 感知(P)' }
];

Page({
  data: {
    typeCode: '',
    typeName: '',
    typeNameEn: '',
    groupName: '',
    dimRings: [],
    impression: '',
    traitList: [],
    traitActive: 0,
    strengthList: [],
    weaknessList: [],
    careerList: [],
    careerAvoid: '',
    careerDevTip: '',
    social: '',
    growthText: '',
    growthList: [],

    dimVisible: false,
    impVisible: false,
    traitsVisible: false,
    accVisible: false,
    acc2Visible: false,
    careerVisible: false,
    infoVisible: false,
    btnVisible: true,

    sheetVisible: false,
    sheetClosing: false,
    sheetTitle: '',
    sheetKey: '',
    sheetData: null,
    _sheetStartY: 0,
    _sheetOffset: 0,

    showSharePreview: false,
    shareImagePath: ''
  },

  onLoad(options) {
    const type = options.type || '';
    const dimsStr = options.dims || '';
    const dims = dimsStr ? dimsStr.split(',').map(Number) : [0, 0, 0, 0];

    const data = TYPE_DATA[type];
    if (!data) {
      wx.showToast({ title: '数据加载失败', icon: 'none' });
      return;
    }

    const dimRings = DIM_DEFS.map((def, i) => {
      const pct = dims[i] || 0;
      const typeLetter = type[i];
      return {
        label: def.label,
        dominant: typeLetter,
        pct,
        _angle: 0
      };
    });

    const strengthList = (data.strengths || []).map(s => ({ ...s, expanded: false }));
    const weaknessList = (data.weaknesses || []).map(w => ({ ...w, expanded: false }));
    const careerList = (data.careers || '').split('、');
    const growthText = (data.growth || []).join('；');

    this.setData({
      typeCode: type,
      typeName: data.name,
      typeNameEn: data.nameEn,
      groupName: data.groupName,
      dimRings,
      impression: data.impression || '',
      traitList: data.traits || [],
      strengthList,
      weaknessList,
      careerList,
      careerAvoid: data.avoid || '',
      careerDevTip: data.devTip || '',
      social: data.social || '',
      growthText,
      growthList: data.growth || []
    });

    const reveals = ['dimVisible', 'impVisible', 'traitsVisible', 'accVisible', 'acc2Visible', 'careerVisible', 'infoVisible'];
    reveals.forEach((k, i) => {
      setTimeout(() => { this.setData({ [k]: true }); }, 400 + i * 110);
    });

    dimRings.forEach((ring, i) => {
      const targetAngle = ring.pct / 100 * 360;
      const steps = 30;
      const stepInterval = 30;
      const startDelay = 700 + i * 130;
      for (let s = 0; s <= steps; s++) {
        const progress = s / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        setTimeout(() => {
          this.setData({ [`dimRings[${i}]._angle`]: targetAngle * eased });
        }, startDelay + s * stepInterval);
      }
    });
  },

  onDetailScroll(e) {
    // Keep handler for future scroll-based features
  },

  onShareAppMessage() {
    return {
      title: `我的MBTI人格：${this.data.typeCode} "${this.data.typeName}"`,
      path: '/pages/guide/guide'
    };
  },

  goBack() { wx.navigateBack(); },

  goHome() { wx.reLaunch({ url: '/pages/hall/hall' }); },

  // ── Share Card ──

  _buildShareData() {
    const { typeCode, typeName, groupName, typeNameEn, dimRings, impression, traitList,
            careerList, careerAvoid, careerDevTip, social, growthText } = this.data;
    const fullData = TYPE_DATA[typeCode] || {};
    const parseDim = (ring) => {
      const parts = ring.label.split(' / ');
      const leftMatch = parts[0].match(/\((\w)\)/);
      const rightMatch = parts[1].match(/\((\w)\)/);
      const leftLetter = leftMatch ? leftMatch[1] : '';
      const rightLetter = rightMatch ? rightMatch[1] : '';
      const leftLabel = parts[0];
      const rightLabel = parts[1];
      if (ring.dominant === rightLetter) {
        return { leftLetter, rightLetter, leftLabel, rightLabel, leftPct: 100 - ring.pct, rightPct: ring.pct, barPct: 100 - ring.pct };
      }
      return { leftLetter, rightLetter, leftLabel, rightLabel, leftPct: ring.pct, rightPct: 100 - ring.pct, barPct: ring.pct };
    };
    return {
      typeCode,
      typeName,
      groupName,
      typeNameEn,
      impression,
      traitList,
      strengths: (fullData.strengths || []).slice(0, 3),
      weaknesses: (fullData.weaknesses || []).slice(0, 3),
      careerList,
      careerAvoid,
      careerDevTip,
      social,
      growthText,
      dimensions: dimRings.map(parseDim)
    };
  },

  async shareReport() {
    wx.showLoading({ title: '生成中...' });
    try {
      const data = this._buildShareData();
      const tempPath = await generateShareCard(this, data, '#shareCanvas', 'fullreport');
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

  noop() {},

  // ── Traits Scroll ──

  onTraitsScroll(e) {
    const scrollLeft = e.detail.scrollLeft;
    const slideWidth = 230;
    const idx = Math.round(scrollLeft / slideWidth);
    if (idx !== this.data.traitActive && idx >= 0 && idx < this.data.traitList.length) {
      this.setData({ traitActive: idx });
    }
  },

  // ── Accordion ──

  toggleAccordion(e) {
    const key = e.currentTarget.dataset.key;
    const index = e.currentTarget.dataset.index;
    const item = this.data[key][index];
    this.setData({ [`${key}[${index}].expanded`]: !item.expanded });
  },

  // ── Bottom Sheet ──

  openSheet(e) {
    const key = e.currentTarget.dataset.key;
    const data = TYPE_DATA[this.data.typeCode];
    if (!data) return;

    let sheetTitle = '';
    let sheetData = null;
    if (key === 'social') {
      sheetTitle = '社交与人际';
      sheetData = data.social || '';
    } else if (key === 'growth') {
      sheetTitle = '成长建议';
      sheetData = data.growth || [];
    }

    this.setData({
      sheetVisible: true, sheetClosing: false,
      sheetTitle, sheetKey: key, sheetData, _sheetOffset: 0
    });
  },

  closeSheet() {
    this.setData({ sheetClosing: true });
    setTimeout(() => { this.setData({ sheetVisible: false, sheetClosing: false }); }, 350);
  },

  onSheetTouchStart(e) { this.setData({ _sheetStartY: e.touches[0].clientY }); },

  onSheetTouchMove(e) {
    const delta = e.touches[0].clientY - this.data._sheetStartY;
    if (delta > 0) this.setData({ _sheetOffset: delta });
  },

  onSheetTouchEnd() {
    if (this.data._sheetOffset > 60) this.closeSheet();
    this.setData({ _sheetOffset: 0 });
  }
});
