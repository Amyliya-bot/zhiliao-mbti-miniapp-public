const { ALL_QUESTIONS_200 } = require('../../data/mbti-200');
const { TYPE_NAMES, TYPE_DESCS, FULL_REPORTS, DIM_MAP } = require('../../data/mbti-types');

const TOTAL = 100;
const PER_DIM = 25;

Page({
  data: {
    questions: [],
    selected: [],
    current: 0,
    showResult: false,
    pct: 0,
    allAnswered: false,
    answeredCount: 0,
    btnText: '下一题 →',
    showError: false,
    resultType: '',
    resultName: '',
    resultDesc: '',
    impression: '',
    report: '',
    pE: 0, pI: 0, pS: 0, pN: 0, pT: 0, pF: 0, pJ: 0, pP: 0
  },
  onLoad() {
    this.initQuiz();
  },
  initQuiz() {
    this._completed = false;
    const byDim = { EI: [], SN: [], TF: [], JP: [] };
    ALL_QUESTIONS_200.forEach(q => byDim[q.dim].push(q));
    let selected = [];
    ['EI', 'SN', 'TF', 'JP'].forEach(dim => {
      const pool = this.shuffle([...byDim[dim]]);
      selected = selected.concat(pool.slice(0, PER_DIM));
    });
    selected = this.shuffle(selected);
    const selArr = selected.map(() => -1);
    this.setData({
      questions: selected,
      selected: selArr,
      current: 0,
      showResult: false,
      pct: 0,
      allAnswered: false,
      answeredCount: 0,
      showError: false,
      btnText: '下一题 →'
    });
  },
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },
  select(e) {
    const opt = parseInt(e.currentTarget.dataset.opt);
    const cur = this.data.current;
    const newSelected = this.data.selected.concat();
    newSelected[cur] = opt;
    let cnt = 0;
    for (let k = 0; k < TOTAL; k++) { if (newSelected[k] >= 0) cnt++; }
    const update = { selected: newSelected, answeredCount: cnt, pct: Math.round(cnt / TOTAL * 100), showError: false };
    if (cur === TOTAL - 1) { update.allAnswered = true; update.btnText = '查看结果 ✓'; }
    this.setData(update);
  },
  nextQ() {
    if (this.data.selected[this.data.current] === -1) {
      this.setData({ showError: true });
      return;
    }
    if (this.data.current === TOTAL - 1) {
      if (this.data.allAnswered) this.handleComplete();
      return;
    }
    if (this.data.current < TOTAL - 1) {
      const next = this.data.current + 1;
      this.setData({ current: next, pct: Math.round(next / TOTAL * 100), showError: false });
    }
  },
  prevQ() {
    if (this.data.current > 0) {
      const prev = this.data.current - 1;
      this.setData({ current: prev, pct: Math.round(prev / TOTAL * 100) });
    }
  },
  handleComplete() {
    if (this._completed) return;
    this._completed = true;
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    const { questions, selected } = this.data;
    questions.forEach((q, idx) => {
      const ans = selected[idx];
      if (ans === -1) return;
      const [left, right] = DIM_MAP[q.dim];
      if (ans === 0) { scores[left] += 2; }
      else if (ans === 1) { scores[left] += 1; scores[right] += 1; }
      else if (ans === 2) { scores[right] += 2; }
    });

    const borderline = {
      EI: scores.E === scores.I,
      SN: scores.S === scores.N,
      TF: scores.T === scores.F,
      JP: scores.J === scores.P
    };

    const type =
      (scores.E > scores.I ? 'E' : 'I') +
      (scores.S > scores.N ? 'S' : 'N') +
      (scores.T > scores.F ? 'T' : 'F') +
      (scores.J > scores.P ? 'J' : 'P');

    // 25 questions per dim, total pool = 50 points per dim
    const calcPct = (score) => Math.round(score / (PER_DIM * 2) * 100);

    const report = FULL_REPORTS[type] || {};

    const resultData = {
      resultType: type,
      resultName: TYPE_NAMES[type] || '未知',
      resultDesc: TYPE_DESCS[type] || '',
      impression: report.impression || '',
      report: (report.traits || '') + '\n\n' + (report.social || ''),
      growth: report.growth || '',
      pE: calcPct(scores.E), pI: calcPct(scores.I),
      pS: calcPct(scores.S), pN: calcPct(scores.N),
      pT: calcPct(scores.T), pF: calcPct(scores.F),
      pJ: calcPct(scores.J), pP: calcPct(scores.P),
      borderlineEI: borderline.EI, borderlineSN: borderline.SN,
      borderlineTF: borderline.TF, borderlineJP: borderline.JP
    };

    getApp().globalData.currentResult = resultData;

    this._pendingScores = scores;
    this._pendingCalcPct = calcPct;

    this.setData({
      showResult: true,
      pct: 100,
      resultType: resultData.resultType,
      resultName: resultData.resultName,
      resultDesc: resultData.resultDesc,
      impression: resultData.impression,
      pE: resultData.pE, pI: resultData.pI,
      pS: resultData.pS, pN: resultData.pN,
      pT: resultData.pT, pF: resultData.pF,
      pJ: resultData.pJ, pP: resultData.pP,
      borderlineEI: resultData.borderlineEI, borderlineSN: resultData.borderlineSN,
      borderlineTF: resultData.borderlineTF, borderlineJP: resultData.borderlineJP
    });

    setTimeout(() => { this.goToResult(); }, 500);
  },
  goToResult() {
    const app = getApp();
    const type = this.data.resultType;
    const calcPct = this._pendingCalcPct;
    const scores = this._pendingScores;
    if (!type || !calcPct || !scores) {
      wx.showToast({ title: '结果生成中，请稍候', icon: 'none' });
      return;
    }
    const historyEntry = {
      type: type,
      name: this.data.resultName,
      dims: [
        Math.max(calcPct(scores.I), calcPct(scores.E)),
        Math.max(calcPct(scores.N), calcPct(scores.S)),
        Math.max(calcPct(scores.F), calcPct(scores.T)),
        Math.max(calcPct(scores.J), calcPct(scores.P))
      ],
      date: new Date().toLocaleDateString('zh-CN'),
      source: '深度测试'
    };
    app.globalData.testHistory.unshift(historyEntry);
    wx.setStorageSync('testHistory', app.globalData.testHistory);
    app.syncTestHistoryToCloud(historyEntry).then(id => {
      if (!id) return;
      historyEntry._id = id;
      wx.setStorageSync('testHistory', app.globalData.testHistory);
    });
    wx.navigateTo({ url: '/pages/result/result' });
  },
  restart() {
    this.initQuiz();
  },
  goBack() {
    wx.navigateBack();
  }
});
