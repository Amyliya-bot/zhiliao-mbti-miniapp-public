const { TYPE_DATA } = require('../../data/mbti-data');
const { generateShareCard } = require('../../utils/share-card');

const DIM_DEFS = [
  { left: 'I', leftLabel: '内向(I)', right: 'E', rightLabel: '外向(E)' },
  { left: 'N', leftLabel: '直觉(N)', right: 'S', rightLabel: '实感(S)' },
  { left: 'T', leftLabel: '思考(T)', right: 'F', rightLabel: '情感(F)' },
  { left: 'J', leftLabel: '判断(J)', right: 'P', rightLabel: '感知(P)' }
];

function clampPct(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 50;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function buildDimBarsFromPcts(pcts) {
  if (!Array.isArray(pcts) || pcts.length !== 8) return null;
  const pctMap = {
    E: clampPct(pcts[0]), I: clampPct(pcts[1]),
    S: clampPct(pcts[2]), N: clampPct(pcts[3]),
    T: clampPct(pcts[4]), F: clampPct(pcts[5]),
    J: clampPct(pcts[6]), P: clampPct(pcts[7])
  };
  return DIM_DEFS.map(def => ({
    leftLabel: def.leftLabel,
    leftPct: pctMap[def.left],
    rightLabel: def.rightLabel,
    rightPct: pctMap[def.right],
    barPct: pctMap[def.left]
  }));
}

function buildDimBarsFromDominant(type, dims) {
  return DIM_DEFS.map((def, i) => {
    const dominantPct = clampPct(dims[i] || 0);
    const typeLetter = type[i];
    if (typeLetter === def.left) {
      return {
        leftLabel: def.leftLabel, leftPct: dominantPct,
        rightLabel: def.rightLabel, rightPct: 100 - dominantPct,
        barPct: dominantPct
      };
    }
    return {
      leftLabel: def.leftLabel, leftPct: 100 - dominantPct,
      rightLabel: def.rightLabel, rightPct: dominantPct,
      barPct: 100 - dominantPct
    };
  });
}

Page({
  data: {
    typeCode: '',
    typeName: '',
    typeNameEn: '',
    groupName: '',
    dimBars: [],
    barsReady: false,
    impression: '',
    traitList: [],
    strengthsPreviews: [],
    weaknessesPreviews: [],
    careerList: [],
    careerAvoid: '',
    careerDevTip: '',
    social: '',
    growthText: '',
    growthList: [],

    dimVisible: false,
    impVisible: false,
    traitsVisible: false,
    colVisible: false,
    careerVisible: false,
    infoVisible: false,
    btnVisible: true,

    sheetVisible: false,
    sheetClosing: false,
    sheetTitle: '',
    sheetKey: '',
    sheetData: null,
    sheetItems: [],
    _sheetStartY: 0,
    _sheetOffset: 0,

    showSharePreview: false,
    shareImagePath: ''
  },

  onLoad(options) {
    const type = options.type || 'INTJ';
    const dimsStr = options.dims || '';
    const dims = dimsStr ? dimsStr.split(',').map(Number) : [0, 0, 0, 0];
    const pctsStr = options.pcts || '';
    const pcts = pctsStr ? pctsStr.split(',').map(Number) : [];

    const data = TYPE_DATA[type];
    if (!data) {
      wx.showToast({ title: '数据加载失败', icon: 'none' });
      return;
    }

    const dimBars = buildDimBarsFromPcts(pcts) || buildDimBarsFromDominant(type, dims);

    const strengthsPreviews = (data.strengths || []).slice(0, 2);
    const weaknessesPreviews = (data.weaknesses || []).slice(0, 2);
    const careerList = (data.careers || '').split('、');
    const growthText = (data.growth || []).join('；');

    this.setData({
      typeCode: type,
      typeName: data.name,
      typeNameEn: data.nameEn,
      groupName: data.groupName,
      dimBars,
      impression: data.impression || '',
      traitList: data.traits || [],
      strengthsPreviews,
      weaknessesPreviews,
      careerList,
      careerAvoid: data.avoid || '',
      careerDevTip: data.devTip || '',
      social: data.social || '',
      growthText,
      growthList: data.growth || [],
      barsReady: true
    });

    const reveals = ['dimVisible', 'impVisible', 'traitsVisible', 'colVisible', 'careerVisible', 'infoVisible'];
    reveals.forEach((key, i) => {
      setTimeout(() => { this.setData({ [key]: true }); }, 300 + i * 120);
    });
  },

  onShareAppMessage() {
    return {
      title: `我的MBTI人格类型：${this.data.typeCode} "${this.data.typeName}"`,
      path: `/pages/guide/guide`
    };
  },

  goBack() {
    wx.navigateBack();
  },

  goHome() {
    wx.reLaunch({ url: '/pages/hall/hall' });
  },

  // ── Share Card ──

  _buildShareData() {
    const { typeCode, typeName, groupName, typeNameEn, dimBars, impression, traitList,
            careerList, careerAvoid, careerDevTip, social, growthText } = this.data;
    const fullData = TYPE_DATA[typeCode] || {};
    const extractLetter = (label) => {
      const match = label.match(/\((\w)\)/);
      return match ? match[1] : '';
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
      dimensions: dimBars.map(bar => ({
        leftLetter: extractLetter(bar.leftLabel),
        rightLetter: extractLetter(bar.rightLabel),
        leftLabel: bar.leftLabel,
        rightLabel: bar.rightLabel,
        leftPct: bar.leftPct,
        rightPct: bar.rightPct,
        barPct: bar.barPct
      }))
    };
  },

  async generateShareCard() {
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

  // ── Bottom Sheet ──

  openSheet(e) {
    const key = e.currentTarget.dataset.key;
    const data = TYPE_DATA[this.data.typeCode];
    if (!data) return;

    let sheetTitle = '';
    let sheetData = null;
    let sheetItems = [];

    switch (key) {
      case 'strengths':
        sheetTitle = '性格优点';
        sheetItems = data.strengths || [];
        break;
      case 'weaknesses':
        sheetTitle = '性格缺点';
        sheetItems = data.weaknesses || [];
        break;
      case 'social':
        sheetTitle = '社交与人际';
        sheetData = data.social || '';
        break;
      case 'growth':
        sheetTitle = '成长建议';
        sheetData = data.growth || [];
        break;
    }

    this.setData({
      sheetVisible: true,
      sheetClosing: false,
      sheetTitle,
      sheetKey: key,
      sheetData,
      sheetItems,
      _sheetOffset: 0
    });
  },

  closeSheet() {
    this.setData({ sheetClosing: true });
    setTimeout(() => {
      this.setData({ sheetVisible: false, sheetClosing: false });
    }, 350);
  },

  onSheetTouchStart(e) {
    this.setData({ _sheetStartY: e.touches[0].clientY });
  },

  onSheetTouchMove(e) {
    const delta = e.touches[0].clientY - this.data._sheetStartY;
    if (delta > 0) {
      this.setData({ _sheetOffset: delta });
    }
  },

  onSheetTouchEnd() {
    if (this.data._sheetOffset > 60) {
      this.closeSheet();
    }
    this.setData({ _sheetOffset: 0 });
  },

});
